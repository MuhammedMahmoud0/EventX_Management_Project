import React, { useState } from "react";

const SeatPicker = ({ rows = ["A", "B", "C"], seatsPerRow = 5, onSelect }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (seat) => {
        let updated;
        if (selectedSeats.includes(seat)) {
            updated = selectedSeats.filter((s) => s !== seat);
        } else {
            updated = [...selectedSeats, seat];
        }
        setSelectedSeats(updated);
        onSelect(updated);
    };

    return (
        <div className="grid gap-4">
            {rows.map((row) => (
                <div key={row} className="flex gap-2 justify-center">
                    {Array.from({ length: seatsPerRow }, (_, i) => {
                        const seat = `${row}${i + 1}`;
                        const isSelected = selectedSeats.includes(seat);
                        return (
                            <button
                                key={seat}
                                onClick={() => toggleSeat(seat)}
                                className={`px-4 py-2 rounded-lg border font-medium transition
                                    ${
                                        isSelected
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {seat}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default SeatPicker;
