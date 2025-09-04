const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    updateSeats,
    bookTickets,
} = require("../controllers/eventController");

const router = express.Router();

// Events
router.route("/").post(protect, admin, createEvent).get(protect, getEvents);
router
    .route("/:id")
    .get(protect, getEventById)
    .put(protect, admin, updateEvent)
    .delete(protect, admin, deleteEvent);

// Update seats manually
router.put("/:id/seats", protect, admin, updateSeats);

// Book tickets (must be authenticated!)
router.post("/events/tickets", protect, bookTickets);

module.exports = router;
