import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import AnalyticsCards from "../components/insights/AnalyticsCards";
import Header from "../components/insights/Header";
import BarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";
import { getAttendees } from "../services/analyticsService";

const AllAttendeeInsights = () => {
    const [attendees, setAttendees] = useState({});
    const [barData, setBarData] = useState([]);
    const [interestsData, setInterestsData] = useState([]);
    const [agesData, setAgesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAttendees()
            .then((data) => {
                setAttendees(data);
                // Aggregate locations for bar
                const locCounts = data.locations.reduce((acc, loc) => {
                    acc[loc] = (acc[loc] || 0) + 1;
                    return acc;
                }, {});
                setBarData(
                    Object.entries(locCounts).map(([loc, value]) => ({
                        value,
                        percentage: `${(
                            (value / data.locations.length) *
                            100
                        ).toFixed(1)}%`,
                        color: "bg-blue-500",
                    }))
                ); // Random colors

                // Interests for donut
                const intCounts = data.interests.flat().reduce((acc, int) => {
                    acc[int] = (acc[int] || 0) + 1;
                    return acc;
                }, {});
                setInterestsData(
                    Object.entries(intCounts).map(([label, value]) => ({
                        label,
                        value,
                        color: "#random",
                    }))
                );

                // Ages for donut
                const ageGroups = {
                    "18-24": 0,
                    "25-34": 0,
                    "35-44": 0,
                    "45+": 0,
                };
                data.ageGroups.forEach((age) => {
                    if (age < 25) ageGroups["18-24"]++;
                    else if (age < 35) ageGroups["25-34"]++;
                    else if (age < 45) ageGroups["35-44"]++;
                    else ageGroups["45+"]++;
                });
                setAgesData(
                    Object.entries(ageGroups).map(([label, value]) => ({
                        label,
                        value,
                        color: "#random",
                    }))
                );
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    if (loading) return <p>Loading insights...</p>;

    return (
        <Page
            header={<Header />}
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <div className="flex space-x-6 h-full">
                <div className="flex-shrink-0">
                    <AnalyticsCards attendees={attendees} />
                </div>
                <div className="flex-1 flex flex-col">
                    <BarChart
                        data={barData}
                        style="bg-white p-4 rounded-lg shadow-lg w-full"
                    />
                    <div className="flex flex-row space-x-6 mt-6">
                        <DonutChart
                            classname="w-122.5 h-[28rem] p-4 bg-white rounded-2xl shadow-md flex flex-col"
                            inner="60"
                            outter="85"
                            data={interestsData}
                            title="Attendee Interests"
                            titleStyle="text-2xl font-bold text-center mb-4"
                        />
                        <DonutChart
                            classname="w-122.5 h-[28rem] p-4 bg-white rounded-2xl shadow-md flex flex-col"
                            inner="0"
                            outter="75"
                            data={agesData}
                            title="Attendee Ages"
                            titleStyle="text-2xl font-bold text-center mb-4"
                        />
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default AllAttendeeInsights;
