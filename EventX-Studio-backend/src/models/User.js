const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        age: { type: Number, required: true }, // Required for age group analytics
        gender: { type: String, required: true, enum: ["male", "female"] }, // Required for gender analytics
        location: { type: String, required: true }, // Required for location analytics
        interests: { type: [String], required: true }, // Required for interest pie charts
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
