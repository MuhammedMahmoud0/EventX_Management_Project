const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
    getUserNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
} = require("../controllers/notificationController");

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get("/", getUserNotifications);
router.put("/:id/read", markAsRead);
router.put("/read-all", markAllAsRead);
router.delete("/:id", deleteNotification);
router.delete("/", clearAllNotifications);

module.exports = router;
