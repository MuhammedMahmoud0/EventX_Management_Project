const Notification = require("../models/Notification");
const User = require("../models/User");

// Create notification helper function
exports.createNotification = async (
    userId,
    title,
    message,
    type,
    relatedId = null,
    relatedModel = null,
    priority = "medium"
) => {
    try {
        const notification = new Notification({
            userId,
            title,
            message,
            type,
            relatedId,
            relatedModel,
            priority,
        });
        await notification.save();
        return notification;
    } catch (err) {
        console.error("Error creating notification:", err);
        throw err;
    }
};

// Broadcast notification to all users (except sender)
exports.broadcastNotification = async (
    title,
    message,
    type,
    senderId = null,
    priority = "medium"
) => {
    try {
        const users = await User.find(
            senderId ? { _id: { $ne: senderId } } : {}
        );
        const notifications = users.map((user) => ({
            userId: user._id,
            title,
            message,
            type,
            priority,
        }));

        await Notification.insertMany(notifications);
        return notifications.length;
    } catch (err) {
        console.error("Error broadcasting notification:", err);
        throw err;
    }
};

// Notify admins only
exports.notifyAdmins = async (
    title,
    message,
    type,
    relatedId = null,
    relatedModel = null
) => {
    try {
        const admins = await User.find({ role: "admin" });
        const notifications = admins.map((admin) => ({
            userId: admin._id,
            title,
            message,
            type,
            relatedId,
            relatedModel,
            priority: "high",
        }));

        await Notification.insertMany(notifications);
        return notifications.length;
    } catch (err) {
        console.error("Error notifying admins:", err);
        throw err;
    }
};

// Get notifications for a user
exports.getUserNotifications = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, unreadOnly = false } = req.query;
        const userId = req.user.id;

        const query = { userId };
        if (unreadOnly === "true") {
            query.isRead = false;
        }

        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate("relatedId");

        const total = await Notification.countDocuments(query);
        const unreadCount = await Notification.countDocuments({
            userId,
            isRead: false,
        });

        res.json({
            notifications,
            total,
            unreadCount,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
        });
    } catch (err) {
        next(err);
    }
};

// Mark notification as read
exports.markAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const notification = await Notification.findOneAndUpdate(
            { _id: id, userId },
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.json(notification);
    } catch (err) {
        next(err);
    }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const result = await Notification.updateMany(
            { userId, isRead: false },
            { isRead: true }
        );

        res.json({
            message: "All notifications marked as read",
            modifiedCount: result.modifiedCount,
        });
    } catch (err) {
        next(err);
    }
};

// Delete notification
exports.deleteNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const notification = await Notification.findOneAndDelete({
            _id: id,
            userId,
        });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.json({ message: "Notification deleted" });
    } catch (err) {
        next(err);
    }
};

// Clear all notifications for a user
exports.clearAllNotifications = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const result = await Notification.deleteMany({ userId });

        res.json({
            message: "All notifications cleared",
            deletedCount: result.deletedCount,
        });
    } catch (err) {
        next(err);
    }
};
