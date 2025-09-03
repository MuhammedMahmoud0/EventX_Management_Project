import React from "react";
import Sidebar from "../global/Sidebar";
import Page from "../components/common/Page";
import Header from "../global/Header";
import Card from "../components/common/Card";
import UpcomingEvents from "../components/common/UpcomingEvents";
import Notifications from "../components/static/Notifications";
import DonutChart from "../components/charts/DonutChart";
import DashLineChart from "../components/charts/LineChart";

const data = [
    { label: "Event A", value: 250, color: "purple" },
    { label: "Event B", value: 450, color: "blue" },
    { label: "Event C", value: 170, color: "gold" },
    { label: "Event D", value: 370, color: "green" },
    { label: "Event E", value: 290, color: "red" },
];

function AdminDashboard() {
    return (
        <Page
            header={<Header />}
            classname={`flex bg-black min-h-screen`}
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <div className="flex space-x-4 max-w-full">
                {/* Left side - Main content area */}
                <div className="flex-1 min-w-0">
                    {/* First row - 3 cards */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <Card
                            icon={"../assets/cards/Dancing.svg"}
                            name={"EVENTS"}
                            value={22 + " Events"}
                            valueColor={"text-blue-800"}
                        />
                        <Card
                            icon={"../assets/cards/Movie Ticket.svg"}
                            name={"BOOKINGS"}
                            value={22}
                            valueColor={"text-[#F29D38]"}
                        />
                        <Card
                            icon={"../assets/cards/Transaction.svg"}
                            name={"REVENUE"}
                            value={"623,5000 LKR"}
                            valueColor={"text-[#1A7A20]"}
                        />
                    </div>

                    {/* Second row - Line chart under first 2 cards, Donut chart under third card */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <div className="w-188">
                                <DashLineChart />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <DonutChart
                                classname={
                                    "w-90 h-[23rem] p-4 bg-white rounded-2xl shadow-md flex flex-col"
                                }
                                inner={45}
                                outter={75}
                                data={data}
                                title={
                                    <div>
                                        <p>Event</p>
                                        <p>Distribution</p>
                                    </div>
                                }
                                titleStyle={
                                    "text-4xl font-bold text-center mb-4"
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Right side - Upcoming events + Notifications */}
                <div className="w-90 flex flex-col space-y-4 flex-shrink-0">
                    <div className="h-full">
                        <UpcomingEvents />
                    </div>
                    <div className="h-full">
                        <Notifications />
                    </div>
                </div>
            </div>
        </Page>
    );
}
// function AdminDashboard() {
//     return (
//         <div className="flex bg-black min-h-screen">
//             {/* Sidebar on the left */}
//             <Sidebar />

//             {/* Main Content in the sparse area */}
//             <div className="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-4">
//                     Dashboard
//                 </h1>
//                 <p className="text-gray-600">
//                     Your cards and elements will go here.
//                 </p>

//                 {/* Example card */}
//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     <div className="bg-white shadow-md rounded-xl p-4">
//                         <h2 className="font-semibold text-gray-700">Card 1</h2>
//                         <p className="text-gray-500 text-sm">
//                             Details about card 1.
//                         </p>
//                     </div>
//                     <div className="bg-white shadow-md rounded-xl p-4">
//                         <h2 className="font-semibold text-gray-700">Card 2</h2>
//                         <p className="text-gray-500 text-sm">
//                             Details about card 2.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default AdminDashboard;
