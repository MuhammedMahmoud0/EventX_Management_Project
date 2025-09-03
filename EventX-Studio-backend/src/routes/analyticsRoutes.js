const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
    getDashboard,
    getAttendees,
    getReports,
    getEventInsights,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/dashboard", protect, admin, getDashboard);
router.get("/attendees", protect, admin, getAttendees);
router.get("/reports", protect, admin, getReports);
router.get("/insights", protect, admin, getEventInsights);

module.exports = router;
