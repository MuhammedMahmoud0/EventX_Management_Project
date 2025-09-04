import React from "react";
import Page from "../components/common/Page";
import SingleHeader from "../components/insights/SingleHeader";
import LolipopChart from "../components/charts/LolipopChart";
import SocialMediaCard from "../components/insights/SocialMediaCard";
import AttendeeLocationsCard from "../components/insights/AttendeeLocationsCard";
import DonutChart from "../components/charts/DonutChart";
import BarChart from "../components/charts/BarChart";

function SingleEventAttendeeInsights() {
    const pieData = [
        { label: "Live Music", value: 50, color: "#0E7BF6" },
        { label: "Innovation", value: 35, color: "#118A40" },
        { label: "EDM Music", value: 35, color: "#FFC363" },
        { label: "Food Festivals", value: 25, color: "#DF5A5A" },
    ];

    const barData = [
        { value: 1000, percentage: "40%", color: "bg-blue-500" },
        { value: 800, percentage: "32%", color: "bg-red-400" },
        { value: 600, percentage: "24%", color: "bg-purple-500" },
        { value: 400, percentage: "16%", color: "bg-orange-400" },
        { value: 200, percentage: "8%", color: "bg-green-600" },
    ];

    return (
        <Page
            header={<SingleHeader />}
            classname={`flex bg-black min-h-screen`}
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 overflow-y-auto"
        >
            <div className="grid grid-cols-6 p-6 overflow-x-hidden">
                <div className="col-start-1 col-end-6">
                    <LolipopChart />
                </div>
                <div className="col-start-1 col-end-3 mt-6">
                    <DonutChart
                        classname={
                            "w-135 h-[23rem] p-4 bg-white rounded-2xl shadow-md flex flex-col"
                        }
                        inner={"60"}
                        outter={"85"}
                        data={pieData}
                        title={"Attendee Interests"}
                        titleStyle={"text-2xl font-bold text-center mb-4"}
                    />
                </div>
                <div className="col-start-3 col-end-6 mt-6 mx-13">
                    <BarChart
                        data={barData}
                        style={
                            "bg-white p-4 rounded-xl shadow-lg w-135 h-[23rem]"
                        }
                    />
                </div>
                <div className="flex flex-col space-y-6 -mt-115">
                    <div className="-mx-30">
                        <SocialMediaCard />
                    </div>
                    <div className="-mx-35 -mt-5">
                        <AttendeeLocationsCard />
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default SingleEventAttendeeInsights;
