import React from "react";
import Page from "../components/common/Page";
import AnalyticsCards from "../components/insights/AnalyticsCards";
import Header from "../components/insights/Header";
import BarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";

const pieData = [
    { label: "Event A", value: 250, color: "purple" },
    { label: "Event B", value: 450, color: "blue" },
    { label: "Event C", value: 170, color: "gold" },
    { label: "Event D", value: 370, color: "green" },
    { label: "Event E", value: 290, color: "red" },
];

const barData = [
    { value: 853, percentage: "11.7%", color: "bg-blue-500" },
    { value: 743, percentage: "10.2%", color: "bg-red-500" },
    { value: 763, percentage: "10.5%", color: "bg-green-600" },
    { value: 934, percentage: "12.9%", color: "bg-purple-600" },
    { value: 783, percentage: "10.8%", color: "bg-black" },
    { value: 643, percentage: "8.9%", color: "bg-orange-500" },
    { value: 687, percentage: "9.5%", color: "bg-teal-500" },
    { value: 936, percentage: "12.9%", color: "bg-yellow-500" },
    { value: 573, percentage: "7.9%", color: "bg-gray-400" },
    { value: 345, percentage: "4.8%", color: "bg-pink-400" },
];

function AllAttendeeInsights() {
    return (
        <Page
            header={<Header />}
            classname={`flex bg-black min-h-screen`}
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <div className="flex space-x-6 h-full">
                {/* Left side - Analytics Cards */}
                <div className="flex-shrink-0">
                    <AnalyticsCards />
                </div>

                {/* Right side - Bar Chart at top */}
                <div className="flex-1 flex flex-col">
                    <div>
                        <BarChart
                            data={barData}
                            style={"bg-white p-4 rounded-lg shadow-lg w-full"}
                        />
                    </div>
                    {/* You can add more components below the chart here */}
                    <div className="flex flex-row space-x-6 mt-6">
                        {/* Additional content can go here */}
                        <DonutChart
                            classname={
                                "w-122.5 h-[28rem] p-4 bg-white rounded-2xl shadow-md flex flex-col"
                            }
                            inner={"60"}
                            outter={"85"}
                            data={pieData}
                            title={"Attendee Interests"}
                            titleStyle={"text-2xl font-bold text-center mb-4"}
                        />
                        <DonutChart
                            classname={
                                "w-122.5 h-[28rem] p-4 bg-white rounded-2xl shadow-md flex flex-col"
                            }
                            inner={"0"}
                            outter={"75"}
                            data={pieData}
                            title={"Attendee Ages"}
                            titleStyle={"text-2xl font-bold text-center mb-4"}
                        />
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default AllAttendeeInsights;
