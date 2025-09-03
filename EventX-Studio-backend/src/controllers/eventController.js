const Event = require("../models/Event");
const { eventSchema } = require("../utils/validators");
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
