const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        date: { type: Date, required: true },
        venue: { type: String, required: true },
        time: { type: String, required: true },
        description: { type: String },
        ticketPrice: { type: Number, required: true }, // Changed from price
        totalSeats: { type: Number, required: true },
        availableSeats: { type: Number, required: true },
        tags: [{ type: String }],
        popularity: { type: String, enum: ["low", "medium", "high"] }, // Enforce valid values
        status: {
            type: String,
            enum: ["upcoming", "active", "closed"],
            default: "upcoming",
        },
    },
    { timestamps: true }
);

eventSchema.virtual("popularityValue").get(function () {
    const map = { low: 1, medium: 2, high: 3 };
    return map[this.popularity] || 0;
});

module.exports = mongoose.model("Event", eventSchema);
