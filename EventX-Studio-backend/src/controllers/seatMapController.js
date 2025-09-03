const SeatMap = require("../models/SeatMap");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const { createNotification } = require("./notificationController");

// Create seat map for an event
exports.createSeatMap = async (req, res, next) => {
    try {
        const { eventId, venue, layout, sections } = req.body;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if seat map already exists
        const existingSeatMap = await SeatMap.findOne({ eventId });
        if (existingSeatMap) {
            return res
                .status(400)
                .json({ message: "Seat map already exists for this event" });
        }

        // Generate seat map
        const seatMap = SeatMap.generateSeatMap(
            eventId,
            venue,
            layout,
            sections
        );
        await seatMap.save();

        // Update event with total seats
        event.totalSeats = seatMap.totalSeats;
        event.availableSeats = seatMap.availableSeats;
        await event.save();

        res.status(201).json(seatMap);
    } catch (err) {
        next(err);
    }
};

// Get seat map for an event
exports.getSeatMap = async (req, res, next) => {
    try {
        const { eventId } = req.params;

        const seatMap = await SeatMap.findOne({ eventId }).populate(
            "eventId",
            "name date venue"
        );

        if (!seatMap) {
            return res.status(404).json({ message: "Seat map not found" });
        }

        res.json(seatMap);
    } catch (err) {
        next(err);
    }
};

// Get available seats
exports.getAvailableSeats = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { category } = req.query;

        const seatMap = await SeatMap.findOne({ eventId });

        if (!seatMap) {
            return res.status(404).json({ message: "Seat map not found" });
        }

        const availableSeats = seatMap.getAvailableSeatsByCategory(category);

        res.json({
            eventId,
            totalAvailable: availableSeats.length,
            seats: availableSeats,
        });
    } catch (err) {
        next(err);
    }
};

// Reserve seats (temporary hold before booking)
exports.reserveSeats = async (req, res, next) => {
    try {
        const { eventId, seatNumbers } = req.body;
        const userId = req.user.id;

        const seatMap = await SeatMap.findOne({ eventId });

        if (!seatMap) {
            return res.status(404).json({ message: "Seat map not found" });
        }

        const reservedSeats = [];
        const errors = [];

        for (const seatNumber of seatNumbers) {
            try {
                // Find the seat
                let seatFound = false;
                for (let section of seatMap.sections) {
                    const seat = section.seats.find(
                        (s) => s.seatNumber === seatNumber
                    );
                    if (seat) {
                        if (seat.status === "available") {
                            seat.status = "reserved";
                            seat.bookedBy = userId;
                            reservedSeats.push(seat);
                            seatMap.availableSeats--;
                        } else {
                            errors.push(`Seat ${seatNumber} is not available`);
                        }
                        seatFound = true;
                        break;
                    }
                }

                if (!seatFound) {
                    errors.push(`Seat ${seatNumber} not found`);
                }
            } catch (err) {
                errors.push(
                    `Error reserving seat ${seatNumber}: ${err.message}`
                );
            }
        }

        if (reservedSeats.length > 0) {
            await seatMap.save();

            // Set timeout to release seats after 10 minutes if not booked
            setTimeout(async () => {
                await this.releaseExpiredReservations(
                    eventId,
                    reservedSeats.map((s) => s.seatNumber)
                );
            }, 10 * 60 * 1000);
        }

        res.json({
            success: reservedSeats.length > 0,
            reservedSeats,
            errors,
            expiresIn: "10 minutes",
        });
    } catch (err) {
        next(err);
    }
};

// Book selected seats
exports.bookSeats = async (req, res, next) => {
    try {
        const { eventId, seatNumbers } = req.body;
        const userId = req.user.id;

        const seatMap = await SeatMap.findOne({ eventId });
        const event = await Event.findById(eventId);

        if (!seatMap) {
            return res.status(404).json({ message: "Seat map not found" });
        }

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const bookedSeats = [];
        const tickets = [];
        const errors = [];

        for (const seatNumber of seatNumbers) {
            let seatFound = false;

            for (let section of seatMap.sections) {
                const seat = section.seats.find(
                    (s) => s.seatNumber === seatNumber
                );

                if (seat) {
                    seatFound = true;

                    if (
                        seat.status === "available" ||
                        (seat.status === "reserved" &&
                            seat.bookedBy.toString() === userId)
                    ) {
                        // Create ticket
                        const { generateQR } = require("../utils/qrGenerator");
                        const qrCode = await generateQR(
                            `ticket-${eventId}-${userId}-${seatNumber}`
                        );

                        const ticket = new Ticket({
                            userId,
                            eventId,
                            seatNumber,
                            qrCode,
                            paymentStatus: "paid",
                            status: "booked",
                        });

                        await ticket.save();

                        // Update seat status
                        seat.status = "booked";
                        seat.bookedBy = userId;
                        seat.ticketId = ticket._id;

                        if (seat.status === "available") {
                            seatMap.availableSeats--;
                        }

                        bookedSeats.push(seat);
                        tickets.push(ticket);
                    } else {
                        errors.push(
                            `Seat ${seatNumber} is not available for booking`
                        );
                    }
                    break;
                }
            }

            if (!seatFound) {
                errors.push(`Seat ${seatNumber} not found`);
            }
        }

        if (bookedSeats.length > 0) {
            await seatMap.save();

            // Update event available seats
            event.availableSeats = seatMap.availableSeats;
            await event.save();

            // Create notification for user
            await createNotification(
                userId,
                "Booking Confirmed",
                `You have successfully booked ${bookedSeats.length} seat(s) for ${event.name}`,
                "booking",
                event._id,
                "Event"
            );
        }

        res.json({
            success: bookedSeats.length > 0,
            bookedSeats,
            tickets,
            errors,
        });
    } catch (err) {
        next(err);
    }
};

// Release seat reservation
exports.releaseSeat = async (req, res, next) => {
    try {
        const { eventId, seatNumber } = req.params;
        const userId = req.user.id;

        const seatMap = await SeatMap.findOne({ eventId });

        if (!seatMap) {
            return res.status(404).json({ message: "Seat map not found" });
        }

        await seatMap.updateSeatStatus(seatNumber, "available");

        res.json({ message: "Seat released successfully" });
    } catch (err) {
        next(err);
    }
};

// Release expired reservations (internal function)
exports.releaseExpiredReservations = async (eventId, seatNumbers) => {
    try {
        const seatMap = await SeatMap.findOne({ eventId });

        if (!seatMap) return;

        for (const seatNumber of seatNumbers) {
            for (let section of seatMap.sections) {
                const seat = section.seats.find(
                    (s) => s.seatNumber === seatNumber
                );

                if (seat && seat.status === "reserved") {
                    seat.status = "available";
                    seat.bookedBy = null;
                    seatMap.availableSeats++;
                    break;
                }
            }
        }

        await seatMap.save();
    } catch (err) {
        console.error("Error releasing expired reservations:", err);
    }
};

// Update seat map layout
exports.updateSeatMap = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const updates = req.body;

        const seatMap = await SeatMap.findOneAndUpdate({ eventId }, updates, {
            new: true,
        });

        if (!seatMap) {
            return res.status(404).json({ message: "Seat map not found" });
        }

        res.json(seatMap);
    } catch (err) {
        next(err);
    }
};

// Get seat details
exports.getSeatDetails = async (req, res, next) => {
    try {
        const { eventId, seatNumber } = req.params;

        const seatMap = await SeatMap.findOne({ eventId }).populate({
            path: "sections.seats.bookedBy",
            select: "name email",
        });

        if (!seatMap) {
            return res.status(404).json({ message: "Seat map not found" });
        }

        let seatDetails = null;

        for (let section of seatMap.sections) {
            const seat = section.seats.find((s) => s.seatNumber === seatNumber);
            if (seat) {
                seatDetails = {
                    section: section.name,
                    ...seat.toObject(),
                };
                break;
            }
        }

        if (!seatDetails) {
            return res.status(404).json({ message: "Seat not found" });
        }

        res.json(seatDetails);
    } catch (err) {
        next(err);
    }
};
