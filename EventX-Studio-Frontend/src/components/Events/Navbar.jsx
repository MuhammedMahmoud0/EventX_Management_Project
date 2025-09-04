import React, { useState } from "react";
import {
    PlusCircle,
    ChevronDown,
    Search,
    Calendar,
    Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventManagementHeader = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Filter");
    const [sort, setSort] = useState("Status");
    const [date, setDate] = useState("");

    return (
        <div className="flex justify-between items-start w-393 bg-white rounded-t-2xl shadow-md p-6 mt-2 mb-6 -mx-6">
            {/* Left Section */}
            <div className="space-y-3">
                <h2 className="text-2xl font-[times-new-roman] font-bold text-gray-900 mb-6">
                    Event Management Section
                </h2>
                <div className="flex space-x-3">
                    {/* New Event Button */}
                    <button
                        className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
                        onClick={() => navigate("/add-event")}
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        New Event
                    </button>

                    {/* Attendee Insights Dropdown */}
                    <button
                        className="flex items-center px-4 py-2 border border-orange-400 text-orange-500 rounded-xl hover:bg-orange-50"
                        onClick={() => navigate("/attendee-insights")}
                    >
                        Attendee Insights
                        <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end space-y-3">
                {/* Top Row: Filter + Search */}
                <div className="flex space-x-3">
                    {/* Filter Dropdown */}
                    <div className="relative flex items-center">
                        <Filter className="absolute left-3 w-4 h-4 text-gray-500" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 appearance-none"
                        >
                            <option value="Filter">Filter</option>
                            <option value="Music">Music</option>
                            <option value="Sports">Sports</option>
                            <option value="Conference">Conference</option>
                        </select>
                        <ChevronDown className="absolute right-3 pointer-events-none w-4 h-4 text-gray-500" />
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center border rounded-lg px-3 py-2 w-64">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="outline-none w-full text-sm"
                        />
                    </div>
                </div>

                {/* Bottom Row: Sort + Pick Date */}
                <div className="flex space-x-3">
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="px-4 py-2 border rounded-lg text-sm text-gray-700 appearance-none"
                        >
                            <option value="Status">Status</option>
                            <option value="Date">Date</option>
                            <option value="Name">Name</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>

                    {/* Date Picker */}
                    <div className="flex items-center border rounded-lg px-3 py-2 text-sm text-gray-700 relative">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-8 h-9"
                        />
                        <span
                            className={date ? "text-gray-800" : "text-gray-400"}
                        >
                            {date || "Pick Date"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventManagementHeader;
