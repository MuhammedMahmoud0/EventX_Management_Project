import React from "react";

const NotificationItem = ({ icon, text }) => (
    <div className="flex items-start space-x-3 py-2 border-b last:border-b-0">
        <img src={icon} alt="icon" className="w-5 h-5 mt-1" />
        <p className="text-sm text-gray-700">{text}</p>
    </div>
);

const Notifications = () => {
    const notifications = [
        {
            icon: "../assets/Notifications/Alarm Clock.svg",
            text: "Paycheck released for artists @Wayo Event",
        },
        {
            icon: "../assets/Notifications/Bank Building.svg",
            text: "Total revenue has been transferred to bank",
        },
        {
            icon: "../assets/Notifications/Alarm Clock.svg",
            text: "@Alan Walker Event in 3 days",
        },
        {
            icon: "../assets/Notifications/Card Payment.svg",
            text: "Paycheck released for artists @Cyndrex Event",
        },
        {
            icon: "../assets/Notifications/Card Payment.svg",
            text: "Paycheck released for artists @Get Together Event",
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-90">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold text-gray-800">
                    Notifications
                </h2>
                <img
                    src="../assets/Upcoming_Event/Arrow.svg"
                    alt="arrow"
                    className="w-10 h-4"
                />
            </div>

            {/* Notifications list */}
            <div className="flex flex-col">
                {notifications.map((n, index) => (
                    <NotificationItem key={index} icon={n.icon} text={n.text} />
                ))}
            </div>

            {/* Footer */}
            <div className="text-right mt-2">
                <a
                    href="/notifications"
                    className="text-sm text-black font-medium hover:underline"
                >
                    See All
                </a>
            </div>
        </div>
    );
};

export default Notifications;
