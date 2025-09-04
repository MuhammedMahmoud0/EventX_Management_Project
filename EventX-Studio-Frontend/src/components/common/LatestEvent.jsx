import React from "react";

const LatestEvent = () => {
    const seats = [
        // Each row of seats
        ["empty", "empty", "empty", "paid", "reserved", "paid", "empty"],
        ["empty", "reserved", "paid", "paid", "empty", "paid", "empty"],
        [
            "reserved",
            "paid",
            "reserved",
            "empty",
            "reserved",
            "reserved",
            "reserved",
        ],
        ["paid", "reserved", "reserved", "paid", "reserved", "paid", "empty"],
    ];

    const seatColors = {
        paid: "bg-purple-700",
        reserved: "bg-purple-400",
        empty: "bg-gray-300",
    };

    return (
        <div className="flex justify-between items-center bg-white rounded-2xl shadow-md p-12 w-285 max-w-6xl">
            {/* Left Side - Event Info */}
            <div>
                <h2 className="text-3xl font-bold mb-4">Latest Event</h2>
                <p className="text-gray-700">
                    <span className="font-semibold">Event Name:</span> Alan
                    Walker EDM Festival
                </p>
                <p className="text-gray-700 mt-2">
                    <span className="font-semibold">Event Date:</span> 28 March
                    2025
                </p>

                {/* Legend */}
                <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-purple-700"></span>
                        <span className="text-sm">Paid Seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-purple-400"></span>
                        <span className="text-sm">Reserved Seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-gray-300"></span>
                        <span className="text-sm">To be sold</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Seats */}
            <div className="grid gap-2 mx-auto">
                {seats.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2 justify-center">
                        {row.map((seat, seatIndex) => (
                            <div
                                key={seatIndex}
                                className={`w-12 h-12 rounded-md ${seatColors[seat]}`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestEvent;
