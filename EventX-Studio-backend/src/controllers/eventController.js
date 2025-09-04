const Event = require("../models/Event");
const { eventSchema } = require("../utils/validators");
const Ticket = require("../models/Ticket");
const {
    createNotification,
    broadcastNotification,
    notifyAdmins,
} = require("./notificationController");

exports.createEvent = async (req, res, next) => {
    const { error } = eventSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    try {
        const event = new Event({
            ...req.body,
            availableSeats: req.body.totalSeats,
        });
        await event.save();

        // Send notification to all users about new event
        await broadcastNotification(
            "New Event Available!",
            `${event.name} is now available for booking on ${new Date(
                event.date
            ).toLocaleDateString()}`,
            "event",
            req.user.id
        );

        res.status(201).json(event);
    } catch (err) {
        next(err);
    }
};

exports.getEvents = async (req, res, next) => {
    const { status, search, sort } = req.query;
    let query = {};

    if (status) query.status = status;
    if (search)
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { venue: { $regex: search, $options: "i" } },
        ];

    let sortOption = {};
    if (sort === "date") sortOption.date = 1;
    if (sort === "ticketPrice") sortOption.ticketPrice = 1;

    try {
        let events = await Event.find(query).sort(sortOption);
        if (sort === "popularity") {
            events = events.sort(
                (a, b) => b.popularityValue - a.popularityValue
            );
        }
        res.json(events);
    } catch (err) {
        next(err);
    }
};

exports.getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (err) {
        next(err);
    }
};

exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (err) {
        next(err);
    }
};

exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Notify users who have tickets for this event
        const tickets = await Ticket.find({ eventId: req.params.id });
        for (const ticket of tickets) {
            await createNotification(
                ticket.userId,
                "Event Cancelled",
                `${event.name} has been cancelled. You will receive a refund.`,
                "event",
                event._id,
                "Event",
                "high"
            );
        }

        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted" });
    } catch (err) {
        next(err);
    }
};

exports.updateSeats = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { seats } = req.body; // Array of seat numbers to update status
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Simple logic: reduce availableSeats based on seats booked
        event.availableSeats -= seats.length;
        await event.save();
        res.json({
            message: "Seats updated",
            availableSeats: event.availableSeats,
        });
    } catch (err) {
        next(err);
    }
};

// exports.bookTickets = async (req, res) => {
//     try {
//         const { eventId, seatNumber } = req.body;
//         const userId = req.user._id;

//         const event = await Event.findById(eventId);
//         if (!event) {
//             return res.status(404).json({ message: "Event not found" });
//         }

//         if (event.availableSeats < 1) {
//             return res.status(400).json({
//                 message: "Not enough seats available",
//             });
//         }

//         // Generate a unique seat number if not provided or if provided seat is taken
//         let finalSeatNumber = seatNumber;

//         if (!seatNumber) {
//             // Find the next available seat number
//             const existingTickets = await Ticket.find({ eventId }).sort({
//                 seatNumber: 1,
//             });
//             const takenSeats = existingTickets.map(
//                 (ticket) => ticket.seatNumber
//             );

//             // Generate seat numbers like A1, A2, A3, etc.
//             let seatCounter = 1;
//             do {
//                 finalSeatNumber = `A${seatCounter}`;
//                 seatCounter++;
//             } while (takenSeats.includes(finalSeatNumber));
//         } else {
//             // Check if the requested seat is available
//             const existingTicket = await Ticket.findOne({
//                 eventId,
//                 seatNumber,
//             });
//             if (existingTicket) {
//                 return res.status(400).json({
//                     message: `Seat ${seatNumber} is already taken`,
//                 });
//             }
//             finalSeatNumber = seatNumber;
//         }

//         // Deduct 1 seat
//         event.availableSeats -= 1;
//         await event.save();

//         // Create ticket with unique seat number
//         const ticket = await Ticket.create({
//             eventId: eventId,
//             userId: userId,
//             seatNumber: finalSeatNumber,
//             status: "booked",
//             price: event.ticketPrice,
//         });

//         res.json({
//             message: "Ticket booked successfully",
//             ticket,
//         });
//     } catch (error) {
//         console.error("BookTickets error:", error);
//         res.status(500).json({
//             message: "Server error",
//             error: error.message,
//         });
//     }
// };

exports.bookTickets = async (req, res) => {
    try {
        console.log("=== BOOKING REQUEST ===");
        console.log("Request body:", req.body);
        console.log("User ID:", req.user?._id);
        const { eventId, seatNumber } = req.body;
        const userId = req.user._id;

        if (!eventId) {
            return res.status(400).json({ message: "Event ID is required" });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.availableSeats < 1) {
            return res.status(400).json({
                message: "Not enough seats available",
            });
        }
        if (!seatNumber) {
            return res.status(400).json({ message: "Seat number is required" });
        }

        if (event.bookedSeats?.includes(seatNumber)) {
            return res
                .status(400)
                .json({ message: `Seat ${seatNumber} is already taken` });
        }

        // Count existing tickets for this event
        const ticketCount = await Ticket.countDocuments({ eventId });
        // const seatNumber = `A${ticketCount + 1}`;

        console.log("Generated seat number:", seatNumber);
        console.log("Ticket count:", ticketCount);

        // Generate QR code
        const qrCodeData = `EVENT:${eventId}|SEAT:${seatNumber}|USER:${userId}|TIME:${Date.now()}`;

        // Create ticket
        const ticket = await Ticket.create({
            eventId: eventId,
            userId: userId,
            seatNumber: seatNumber,
            qrCode: qrCodeData,
            status: "booked",
            price: event.ticketPrice,
            paymentStatus: "paid",
        });
        // ✅ Add this here
        event.bookedSeats = event.bookedSeats || [];
        event.bookedSeats.push(seatNumber);
        // Update available seats
        event.availableSeats -= 1;
        await event.save();

        res.json({
            message: "Ticket booked successfully",
            ticket: ticket,
        });
    } catch (error) {
        console.error("BookTickets error:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Seat assignment conflict, please try again",
            });
        }

        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
