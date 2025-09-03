const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { generateQR } = require("../utils/qrGenerator");
const {
    createNotification,
    notifyAdmins,
} = require("./notificationController");

exports.bookTicket = async (req, res, next) => {
    const { eventId, seatNumber } = req.body;
    const userId = req.user.id;

    try {
        const event = await Event.findById(eventId);
        const user = await User.findById(userId);

        if (!event || event.availableSeats <= 0)
            return res.status(400).json({ message: "No seats available" });

        event.availableSeats -= 1;
        await event.save();

        const qrCode = await generateQR(`ticket-${eventId}-${userId}`);

        const ticket = new Ticket({ userId, eventId, seatNumber, qrCode });
        await ticket.save();

        // Send notification to user
        await createNotification(
            userId,
            "Booking Confirmed!",
            `Your ticket for ${event.name} has been confirmed. Seat: ${seatNumber}`,
            "booking",
            ticket._id,
            "Ticket"
        );

        // Notify admins about new booking
        await notifyAdmins(
            "New Ticket Booking",
            `${user.name} has booked a ticket for ${event.name}`,
            "booking",
            ticket._id,
            "Ticket"
        );

        res.status(201).json(ticket);
    } catch (err) {
        next(err);
    }
};

exports.getMyTickets = async (req, res, next) => {
    try {
        const tickets = await Ticket.find({ userId: req.user.id }).populate(
            "eventId"
        );
        res.json(tickets);
    } catch (err) {
        next(err);
    }
};

exports.getEventTickets = async (req, res, next) => {
    try {
        const tickets = await Ticket.find({
            eventId: req.params.eventId,
        }).populate("userId");
        res.json(tickets);
    } catch (err) {
        next(err);
    }
};

exports.updateTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!ticket)
            return res.status(404).json({ message: "Ticket not found" });
        res.json(ticket);
    } catch (err) {
        next(err);
    }
};
