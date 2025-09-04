import React, { useEffect, useState } from "react";
import { getNotifications } from "../../services/notificationService";

const NotificationItem = ({ icon, text }) => (
    <div className="flex items-start space-x-3 py-2 border-b last:border-b-0">
        <img src={icon} alt="icon" className="w-5 h-5 mt-1" />
        <p className="text-sm text-gray-700">{text}</p>
    </div>
);

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotifications()
            .then((data) => {
                // Keep only the latest 5 notifications
                setNotifications(data.notifications.slice(0, 5));
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    if (loading) return <p>Loading notifications...</p>;

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
                {notifications.map((notif) => (
                    <NotificationItem
                        key={notif._id}
                        icon="../assets/Notifications/Alarm Clock.svg" // Or dynamic icon if you have one
                        text={`${notif.title}: ${notif.message}`}
                    />
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
