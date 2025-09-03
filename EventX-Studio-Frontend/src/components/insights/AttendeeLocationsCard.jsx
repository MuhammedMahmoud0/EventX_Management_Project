import React from "react";

const AttendeeLocationsCard = () => {
    const locations = [
        { name: "Colombo", count: 227, color: "bg-blue-500" },
        { name: "Kandy", count: 123, color: "bg-red-400" },
        { name: "Galle", count: 143, color: "bg-purple-500" },
        { name: "Jaffna", count: 70, color: "bg-orange-400" },
        { name: "International", count: 52, color: "bg-green-600" },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-300 m-6 p-6 max-w-sm h-95">
            {/* Inner Card Content */}
            {/* Header */}
            <h2 className="text-lg font-bold text-black pb-2">
                ATTENDEE LOCATIONS
            </h2>
            <div className="border-2 border-black rounded-2xl overflow-hidden">
                {/* Table */}
                <div className="divide-y-2 divide-black">
                    {/* Table Header */}
                    <div className="grid grid-cols-2 font-semibold text-black">
                        <div className="p-3 border-r-2 border-black">
                            Location
                        </div>
                        <div className="p-3">Count</div>
                    </div>

                    {/* Table Rows */}
                    {locations.map((location) => (
                        <div key={location.name} className="grid grid-cols-2">
                            <div className="p-3 text-black border-r-2 border-black">
                                {location.name}
                            </div>
                            <div className="p-3 text-black flex items-center justify-between">
                                <span>{location.count}</span>
                                <div
                                    className={`w-4 h-4 rounded-full ${location.color}`}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttendeeLocationsCard;
