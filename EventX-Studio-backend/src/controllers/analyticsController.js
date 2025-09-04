const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const mongoose = require("mongoose");

// Fix 1: analyticsController.js - Add missing import and fix deprecated method

exports.getDashboard = async (req, res, next) => {
    try {
        const eventsCount = await Event.countDocuments();
        const bookingsCount = await Ticket.countDocuments();

        // IMPROVED: Calculate actual revenue from tickets
        const revenueResult = await Ticket.aggregate([
            {
                $lookup: {
                    from: "events",
                    localField: "eventId",
                    foreignField: "_id",
                    as: "event",
                },
            },
            { $unwind: "$event" },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: {
                            $ifNull: ["$price", "$event.ticketPrice"], // Use ticket price if available, fallback to event price
                        },
                    },
                },
            },
        ]);
        const revenue = revenueResult[0]?.total || 0;

        const upcomingEvents = await Event.countDocuments({
            date: { $gt: new Date() },
        });

        res.json({
            events: eventsCount,
            bookings: bookingsCount,
            revenue: revenue,
            upcomingEvents,
        });
    } catch (err) {
        next(err);
    }
};

exports.getAttendees = async (req, res, next) => {
    const { eventId } = req.query;

    let match = {};
    if (eventId) match.eventId = new mongoose.Types.ObjectId(eventId);
    { $match: { eventId: new mongoose.Types.ObjectId(eventId) } }

    try {
        const pipeline = [
            { $match: match },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $group: {
                    _id: null,
                    ageGroups: { $push: "$user.age" },
                    genders: { $push: "$user.gender" },
                    locations: { $push: "$user.location" },
                    interests: { $push: "$user.interests" },
                },
            },
        ];
        // console.log("Pipeline Stages:", pipeline); // Log the pipeline
        const attendees = await Ticket.aggregate(pipeline);
        // console.log(
        //     "Raw Attendees Data:",
        //     await Ticket.aggregate([...pipeline.slice(0, -1)])
        // ); // Log before grouping
        res.json(attendees[0] || {});
    } catch (err) {
        next(err);
    }
};

exports.getReports = async (req, res, next) => {
    const { type } = req.query;

    try {
        if (type === "sales") {
            const sales = await Ticket.aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt",
                            },
                        },
                        count: { $sum: 1 },
                    },
                },
            ]);
            res.json(sales);
        } else {
            res.status(400).json({ message: "Invalid report type" });
        }
    } catch (err) {
        next(err);
    }
};

exports.getEventInsights = async (req, res, next) => {
    const { eventId } = req.query;
    try {
        const attendees = await Ticket.aggregate([
            { $match: { eventId: mongoose.Types.ObjectId(eventId) } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $group: {
                    _id: null,
                    totalAttendees: { $sum: 1 },
                    ageGroups: { $push: "$user.age" },
                    locations: { $push: "$user.location" },
                    interests: { $push: "$user.interests" },
                },
            },
        ]);
        // Mock social media data (to match Figma)
        const socialMedia = {
            instagramMentions: 5200,
            facebookShares: 3800,
            twitterTweets: 1200,
            qrScans: 9500,
            totalReach: 19700,
        };
        res.json({ ...attendees[0], socialMedia });
    } catch (err) {
        next(err);
    }
};
