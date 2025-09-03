// /controllers/userController.js (NEW FILE)
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Notification = require("../models/Notification");
const {
    createNotification,
    notifyAdmins,
} = require("./notificationController");

// Get all users (admin only)
exports.getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, role, search } = req.query;

        let query = {};
        if (role) query.role = role;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        const users = await User.find(query)
            .select("-password")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        res.json({
            users,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
        });
    } catch (err) {
        next(err);
    }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
};

// Update user
exports.updateUser = async (req, res, next) => {
    try {
        const { name, email, role, age, gender, location, interests } =
            req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (role && req.user.role === "admin") user.role = role;
        if (age) user.age = age;
        if (gender) user.gender = gender;
        if (location) user.location = location;
        if (interests) user.interests = interests;

        await user.save();

        // Send notification to user about profile update
        await createNotification(
            user._id,
            "Profile Updated",
            "Your profile has been successfully updated",
            "user"
        );

        res.json({
            message: "User updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        next(err);
    }
};

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        // Check if user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent admin from deleting themselves
        if (userId === req.user.id) {
            return res
                .status(400)
                .json({ message: "You cannot delete your own account" });
        }

        // Check if user has any active tickets
        const activeTickets = await Ticket.find({
            userId,
            status: { $in: ["booked", "pending"] },
        });

        if (activeTickets.length > 0) {
            return res.status(400).json({
                message:
                    "Cannot delete user with active tickets. Please cancel their tickets first.",
                activeTickets: activeTickets.length,
            });
        }

        // Delete user's notifications
        await Notification.deleteMany({ userId });

        // Delete user's tickets (cancelled/completed ones)
        await Ticket.deleteMany({ userId });

        // Delete the user
        await User.findByIdAndDelete(userId);

        // Notify admins about user deletion
        await notifyAdmins(
            "User Deleted",
            `User ${user.name} (${user.email}) has been deleted from the system`,
            "system"
        );

        res.json({
            message: "User deleted successfully",
            deletedUser: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
};

// Get user profile (for logged in user)
exports.getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get additional stats
        const ticketsCount = await Ticket.countDocuments({
            userId: req.user.id,
        });
        const unreadNotifications = await Notification.countDocuments({
            userId: req.user.id,
            isRead: false,
        });

        res.json({
            ...user.toObject(),
            stats: {
                totalTickets: ticketsCount,
                unreadNotifications,
            },
        });
    } catch (err) {
        next(err);
    }
};

// Update my profile
exports.updateMyProfile = async (req, res, next) => {
    try {
        const { name, age, gender, location, interests } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update allowed fields
        if (name) user.name = name;
        if (age) user.age = age;
        if (gender) user.gender = gender;
        if (location) user.location = location;
        if (interests) user.interests = interests;

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: user.toObject(),
        });
    } catch (err) {
        next(err);
    }
};
