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
    const [interestsData, setInterestsData] = useState([
        { label: "Event A", value: 250, color: "purple" },
        { label: "Event B", value: 450, color: "blue" },
        { label: "Event C", value: 170, color: "gold" },
        { label: "Event D", value: 370, color: "green" },
        { label: "Event E", value: 290, color: "red" },
    ]);
    const [agesData, setAgesData] = useState([
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
    ]);
    const [loading, setLoading] = useState(true);

    // Function to generate random colors
    const getRandomColor = () => {
        const colors = [
            "#3b82f6", // blue
            "#ef4444", // red
            "#10b981", // emerald
            "#f59e0b", // amber
            "#8b5cf6", // violet
            "#06b6d4", // cyan
            "#84cc16", // lime
            "#f97316", // orange
            "#ec4899", // pink
            "#6366f1", // indigo
            "#14b8a6", // teal
            "#f43f5e", // rose
            "#a855f7", // purple
            "#22c55e", // green
            "#eab308", // yellow
            "#64748b", // slate
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Function to generate random colors for bar chart (with bg- prefix)
    const getRandomBgColor = () => {
        const bgColors = [
            "bg-blue-500",
            "bg-red-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-teal-500",
            "bg-orange-500",
            "bg-cyan-500",
            "bg-lime-500",
            "bg-emerald-500",
            "bg-violet-500",
            "bg-rose-500",
            "bg-amber-500",
            "bg-slate-500",
        ];
        return bgColors[Math.floor(Math.random() * bgColors.length)];
    };

    useEffect(() => {
        getAttendees()
            .then((data) => {
                setAttendees(data);

                // Aggregate locations for bar chart
                const locCounts = data.locations.reduce((acc, loc) => {
                    acc[loc] = (acc[loc] || 0) + 1;
                    return acc;
                }, {});

                setBarData(
                    Object.entries(locCounts).map(([loc, value]) => ({
                        label: loc,
                        value,
                        percentage: `${(
                            (value / data.locations.length) *
                            100
                        ).toFixed(1)}%`,
                        color: getRandomBgColor(), // Random background color for bar chart
                    }))
                );

                // Interests for donut chart with random colors
                const intCounts = data.interests.flat().reduce((acc, int) => {
                    acc[int] = (acc[int] || 0) + 1;
                    return acc;
                }, {});

                setInterestsData(
                    Object.entries(intCounts).map(([label, value]) => ({
                        label,
                        value,
                        color: getRandomColor(), // Random hex color for donut chart
                    }))
                );

                // Ages for donut chart with random colors
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
                        color: getRandomColor(), // Random hex color for donut chart
                    }))
                );

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching attendees:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Page
                header={<Header />}
                classname="flex bg-black min-h-screen"
                sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
            >
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">
                        Loading insights...
                    </span>
                </div>
            </Page>
        );
    }

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
