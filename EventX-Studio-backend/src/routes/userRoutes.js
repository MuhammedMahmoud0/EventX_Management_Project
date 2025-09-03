const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
} = require("../controllers/userController");

const router = express.Router();

// User's own profile routes
router.get("/profile", protect, getMyProfile);
router.put("/profile", protect, updateMyProfile);

// Admin only routes
router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
