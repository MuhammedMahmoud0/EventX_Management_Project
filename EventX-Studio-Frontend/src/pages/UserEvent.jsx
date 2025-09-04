import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import EventCard from "../components/Events/EventCard";
import Navbar from "../components/Events/Navbar";
import EventStatusLegend from "../components/Events/EventStatusLegend";
import { getEvents } from "../services/eventService";

const UserEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents().then(setEvents).catch(console.error);
    }, []);

    const upcoming = events.filter((e) => e.status === "upcoming");
    const pending = events.filter((e) => e.status === "pending");
    const closed = events.filter((e) => e.status === "closed");

    return (
        <Page
            header={<Navbar />}
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <EventStatusLegend />
            <div className="flex space-x-71 h-[calc(100vh-260px)] overflow-x-auto overflow-x-hidden pr-2">
                <div className="flex-1">
                    {upcoming.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
                <div className="flex-1">
                    {pending.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
                <div className="flex-1">
                    {closed.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            </div>
        </Page>
    );
};

export default UserEvent;
