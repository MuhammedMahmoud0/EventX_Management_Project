import React from "react";
import Page from "../components/common/Page";

function Notifications() {
    return (
        <Page
            classname={`flex bg-black min-h-screen`}
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1>Notification</h1>
        </Page>
    );
}

export default Notifications;
