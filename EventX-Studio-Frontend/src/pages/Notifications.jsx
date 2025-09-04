import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import Button from "../components/common/Button";
import {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "../services/notificationService";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotifications({ unreadOnly: true })
            .then((data) => {
                setNotifications(data.notifications);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const handleMarkRead = (id) => {
        markAsRead(id)
            .then((updated) =>
                setNotifications(
                    notifications.map((n) => (n._id === id ? updated : n))
                )
            )
            .catch(console.error);
    };

    const handleMarkAll = () => {
        markAllAsRead()
            .then(() => setNotifications([]))
            .catch(console.error);
    };

    if (loading) return <p>Loading notifications...</p>;

    return (
        <Page
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1>Notifications</h1>
            <Button onClick={handleMarkAll}>Mark All as Read</Button>
            {notifications.map((notif) => (
                <div
                    key={notif._id}
                    className="bg-white p-4 rounded shadow mb-4"
                >
                    <p>
                        {notif.title}: {notif.message}
                    </p>
                    <Button onClick={() => handleMarkRead(notif._id)}>
                        Mark Read
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() =>
                            deleteNotification(notif._id).then(() =>
                                setNotifications(
                                    notifications.filter(
                                        (n) => n._id !== notif._id
                                    )
                                )
                            )
                        }
                    >
                        Delete
                    </Button>
                </div>
            ))}
        </Page>
    );
};

export default Notifications;
