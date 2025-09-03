import React from "react";

const EventStatusLegend = () => {
    const statuses = [
        { color: "bg-blue-600", label: "Up-Coming Events" },
        { color: "bg-green-600", label: "Pending Events" },
        { color: "bg-red-600", label: "Closed Events" },
    ];

    return (
        <div className="flex justify-between px-20 mb-4">
            {statuses.map((status, index) => (
                <div key={index} className="flex items-center space-x-3">
                    <span
                        className={`w-4 h-4 rounded-full ${status.color}`}
                    ></span>
                    <span className="text-gray-800 font-medium">
                        {status.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default EventStatusLegend;
