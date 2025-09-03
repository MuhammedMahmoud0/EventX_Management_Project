import React from "react";
import Page from "../components/common/Page";
import EventDetails from "../components/Events/EventDetails";

function EventDetailsPage() {
    return (
        <Page
            classname={`flex bg-black`}
            sparse={"flex-1 bg-[#F2F2F2] rounded-2xl m-6  overflow-y-auto"}
        >
            <EventDetails />
        </Page>
    );
}

export default EventDetailsPage;
