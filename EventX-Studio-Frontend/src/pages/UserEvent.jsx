import React from "react";
import Page from "../components/common/Page";
import EventCard from "../components/Events/EventCard";
import Navbar from "../components/Events/Navbar";
import EventStatusLegend from "../components/Events/EventStatusLegend";

function UserEvent() {
    return (
        <Page
            header={<Navbar />}
            classname={`flex bg-black min-h-screen`}
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <EventStatusLegend />
            <div className="flex space-x-71 h-[calc(100vh-260px)] overflow-x-auto overflow-x-hidden pr-2">
                <div className="flex flex-col">
                    <EventCard />
                    <br />
                    <EventCard />
                    <br />
                    <EventCard />
                    <br />
                </div>
                <div className="flex flex-col">
                    <EventCard />
                    <br />
                    <EventCard />
                    <br />
                    <EventCard />
                    <br />
                </div>
                <div className="flex flex-col">
                    <EventCard />
                    <br />
                    <EventCard />
                    <br />
                    <EventCard />
                    <br />
                    <EventCard />
                    <br />
                </div>
            </div>
        </Page>
    );
}

export default UserEvent;
