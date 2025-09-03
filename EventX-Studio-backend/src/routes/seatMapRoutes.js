const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
    createSeatMap,
    getSeatMap,
    getAvailableSeats,
    reserveSeats,
    bookSeats,
    releaseSeat,
    updateSeatMap,
    getSeatDetails,
} = require("../controllers/seatMapController");

const router = express.Router();

// Public routes (with auth)
router.get("/:eventId", protect, getSeatMap);
router.get("/:eventId/available", protect, getAvailableSeats);
router.get("/:eventId/seat/:seatNumber", protect, getSeatDetails);

// User actions
router.post("/reserve", protect, reserveSeats);
router.post("/book", protect, bookSeats);
router.delete("/:eventId/seat/:seatNumber", protect, releaseSeat);

// Admin only routes
router.post("/", protect, admin, createSeatMap);
router.put("/:eventId", protect, admin, updateSeatMap);

module.exports = router;
