const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    updateSeats,
} = require("../controllers/eventController");

const router = express.Router();

router.route("/").post(protect, admin, createEvent).get(protect, getEvents);
router
    .route("/:id")
    .get(protect, getEventById)
    .put(protect, admin, updateEvent)
    .delete(protect, admin, deleteEvent);

router.put("/:id/seats", protect, admin, updateSeats);

module.exports = router;
