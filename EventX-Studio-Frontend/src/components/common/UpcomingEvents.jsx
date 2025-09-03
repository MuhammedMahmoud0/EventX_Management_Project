import React from "react";

// Single Event Card
const EventItem = ({ icon, title, date }) => {
    return (
        <div className="flex items-center bg-white rounded-xl shadow-sm p-3 space-x-3">
            {/* Icon */}
            <img
                src={icon}
                alt={title}
                className="w-10 h-10 rounded-full object-cover"
            />

            {/* Text */}
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                    Event : {title}
                </span>
                <span className="text-xs text-gray-500">Date : {date}</span>
            </div>
        </div>
    );
};

// Main Card
const UpcomingEvents = () => {
    const events = [
        {
            icon: "../assets/events/cynosure.png",
            title: "Cynosure Festival",
            date: "24 March 2025",
        },
        {
            icon: "../assets/events/nightor.png",
            title: "Nightor Festival",
            date: "30 March 2025",
        },
        {
            icon: "../assets/events/cyndrex.png",
            title: "Cyndrex Festival",
            date: "03 April 2025",
        },
        {
            icon: "../assets/events/hyper.png",
            title: "Hyper Festival",
            date: "10 April 2025",
        },
        {
            icon: "../assets/events/edm.png",
            title: "EDM Festival",
            date: "15 April 2025",
        },
    ];

    return (
        <div className="bg-gray-50 rounded-2xl shadow-md px-3 py-2 w-90">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold text-gray-700">
                    UPCOMING EVENTS
                </h2>
                <img
                    src="../assets/Upcoming_Event/Arrow.svg"
                    alt=""
                    className="w-10 h-4"
                />
            </div>

            {/* Events List */}
            <div className="flex flex-col gap-3">
                {events.map((event, index) => (
                    <EventItem
                        key={index}
                        icon={event.icon}
                        title={event.title}
                        date={event.date}
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="text-right mt-3">
                <a
                    href="/events"
                    className="text-sm text-black font-medium hover:underline"
                >
                    See All
                </a>
            </div>
        </div>
    );
};

export default UpcomingEvents;
