const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        seatNumber: { type: String, required: true },
        qrCode: { type: String, required: true },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "paid",
        },
        status: {
            type: String,
            enum: ["booked", "cancelled", "used", "expired"],
            default: "booked",
        },
        price: { type: Number }, // Store the price at time of booking
        bookingDate: { type: Date, default: Date.now },
        usedAt: { type: Date }, // When ticket was scanned/used
    },
    { timestamps: true }
);

// Index for faster queries
// ticketSchema.index({ userId: 1, eventId: 1 });
ticketSchema.index({ eventId: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model("Ticket", ticketSchema);
