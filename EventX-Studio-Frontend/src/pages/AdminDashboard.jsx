import React, { useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import Page from "../components/common/Page";
import Header from "../global/Header";
import Card from "../components/common/Card";
import UpcomingEvents from "../components/common/UpcomingEvents";
import Notifications from "../components/static/Notifications"; // Update this to dynamic below if needed
import DonutChart from "../components/charts/DonutChart";
import DashLineChart from "../components/charts/LineChart";
import LatestEvent from "../components/common/LatestEvent";
import { getAnalytics, getReports } from "../services/analyticsService";
import { getEvents } from "../services/eventService";
import { getSeatMap } from "../services/seatMapService";

const AdminDashboard = () => {
    const [analytics, setAnalytics] = useState({
        events: 0,
        bookings: 0,
        revenue: 0,
        upcomingEvents: 0,
    });
    const [salesData, setSalesData] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [latestEvent, setLatestEvent] = useState(null);
    const [seatMap, setSeatMap] = useState(null);
    const [eventDistribution, setEventDistribution] = useState([]); // For donut, aggregate from events

    // const color = ["#6B46C1", "#E53E3E", "#38A169", "#3182CE", "#DD6B20"];

    useEffect(() => {
        getAnalytics().then(setAnalytics).catch(console.error);
        getReports({ type: "sales" })
            .then((data) =>
                setSalesData(
                    data.map((item) => ({ week: item._id, amount: item.count }))
                )
            )
            .catch(console.error);
        getEvents({ status: "upcoming" })
            .then(setUpcoming)
            .catch(console.error);
        getEvents()
            .then((events) => {
                if (events.length) {
                    const latest = events[events.length - 1];
                    setLatestEvent(latest);
                    getSeatMap(latest._id)
                        .then(setSeatMap)
                        .catch(console.error);
                }

                // Aggregate for donut (e.g., by popularity)
                const dist = events.reduce((acc, ev) => {
                    acc[ev.popularity] = (acc[ev.popularity] || 0) + 1;
                    return acc;
                }, {});

                const colors = ["purple", "red", "green", "blue", "orange"];

                setEventDistribution(
                    Object.entries(dist).map(([label, value], index) => ({
                        label,
                        value,
                        color: colors[index % colors.length], // cycle through array
                    }))
                );
            })
            .catch(console.error);
    }, []);

    return (
        <Page
            header={<Header />}
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <div className="flex space-x-4 max-w-full">
                <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <Card
                            icon="../assets/cards/Dancing.svg"
                            name="EVENTS"
                            value={analytics.events + " Events"}
                            valueColor="text-blue-800"
                        />
                        <Card
                            icon="../assets/cards/Movie Ticket.svg"
                            name="BOOKINGS"
                            value={analytics.bookings}
                            valueColor="text-[#F29D38]"
                        />
                        <Card
                            icon="../assets/cards/Transaction.svg"
                            name="REVENUE"
                            value={analytics.revenue + " LKR"}
                            valueColor="text-[#1A7A20]"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <DashLineChart data={salesData} />
                        </div>
                        <div className="col-span-1">
                            <DonutChart
                                classname="w-90 h-[23rem] p-4 bg-white rounded-2xl shadow-md flex flex-col"
                                inner={45}
                                outter={75}
                                data={eventDistribution}
                                title="Event Distribution"
                                titleStyle="text-4xl font-bold text-center mb-4"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-90 flex flex-col space-y-4 flex-shrink-0">
                    <UpcomingEvents events={upcoming} /> {/* Pass dynamic */}
                    <Notifications /> {/* Dynamic in its file */}
                </div>
            </div>
            <div className="-mt-78">
                <LatestEvent
                    event={latestEvent}
                    seats={
                        seatMap ? seatMap.sections.flatMap((s) => s.seats) : []
                    }
                />{" "}
                {/* Pass dynamic */}
            </div>
        </Page>
    );
};

export default AdminDashboard;
