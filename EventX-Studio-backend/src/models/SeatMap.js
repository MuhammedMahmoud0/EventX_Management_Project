const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true,
    },
    row: {
        type: String,
        required: true,
    },
    column: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "booked", "reserved", "blocked"],
        default: "available",
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["vip", "premium", "standard", "economy"],
        default: "standard",
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
    },
});

const seatMapSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
            unique: true,
        },
        venue: {
            type: String,
            required: true,
        },
        sections: [
            {
                name: {
                    type: String,
                    required: true,
                },
                rows: {
                    type: Number,
                    required: true,
                },
                columns: {
                    type: Number,
                    required: true,
                },
                seats: [seatSchema],
            },
        ],
        totalSeats: {
            type: Number,
            required: true,
        },
        availableSeats: {
            type: Number,
            required: true,
        },
        layout: {
            type: String,
            enum: ["theater", "stadium", "concert", "conference"],
            default: "theater",
        },
    },
    { timestamps: true }
);

// Method to update seat status
seatMapSchema.methods.updateSeatStatus = async function (
    seatNumber,
    status,
    userId = null,
    ticketId = null
) {
    let seatFound = false;

    for (let section of this.sections) {
        const seat = section.seats.find((s) => s.seatNumber === seatNumber);
        if (seat) {
            const oldStatus = seat.status;
            seat.status = status;

            if (status === "booked") {
                seat.bookedBy = userId;
                seat.ticketId = ticketId;
                if (oldStatus === "available") {
                    this.availableSeats--;
                }
            } else if (status === "available") {
                seat.bookedBy = null;
                seat.ticketId = null;
                if (oldStatus === "booked" || oldStatus === "reserved") {
                    this.availableSeats++;
                }
            }

            seatFound = true;
            break;
        }
    }

    if (!seatFound) {
        throw new Error("Seat not found");
    }

    return this.save();
};

// Method to get available seats by category
seatMapSchema.methods.getAvailableSeatsByCategory = function (category) {
    const availableSeats = [];

    for (let section of this.sections) {
        for (let seat of section.seats) {
            if (
                seat.status === "available" &&
                (!category || seat.category === category)
            ) {
                availableSeats.push({
                    sectionName: section.name,
                    ...seat.toObject(),
                });
            }
        }
    }

    return availableSeats;
};

// Static method to generate seat map for an event
seatMapSchema.statics.generateSeatMap = function (
    eventId,
    venue,
    layout,
    sections
) {
    const seats = [];
    let totalSeats = 0;

    const processedSections = sections.map((section) => {
        const sectionSeats = [];
        for (let row = 0; row < section.rows; row++) {
            const rowLetter = String.fromCharCode(65 + row); // A, B, C, etc.
            for (let col = 1; col <= section.columns; col++) {
                const seatNumber = `${section.name}-${rowLetter}${col}`;
                sectionSeats.push({
                    seatNumber,
                    row: rowLetter,
                    column: col,
                    status: "available",
                    price: section.basePrice || 100,
                    category: section.category || "standard",
                });
                totalSeats++;
            }
        }

        return {
            name: section.name,
            rows: section.rows,
            columns: section.columns,
            seats: sectionSeats,
        };
    });

    return new this({
        eventId,
        venue,
        layout,
        sections: processedSections,
        totalSeats,
        availableSeats: totalSeats,
    });
};

module.exports = mongoose.model("SeatMap", seatMapSchema);
