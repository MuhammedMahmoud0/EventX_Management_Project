import React from "react";
import { Search, Users, Filter } from "lucide-react";

const SingleHeader = () => {
    return (
        <div className="flex items-start justify-between bg-white p-4 rounded-t-2xl rounded-tr-2xl shadow-sm mt-8">
            {/* Left Side - Event Info */}
            <div>
                <div className="flex items-center space-x-3">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                        <img
                            src="/assets/Event Cards/Back Arrow.svg"
                            alt="Back"
                            className="w-10 h-10"
                        />
                    </button>
                    <h2 className="text-xl font-bold">
                        Attendee Insights – Colombo Music Festival 2025
                    </h2>
                </div>
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                    <li>
                        • Event Venue : Viharamahadevi Open Air Theater, Colombo
                    </li>
                    <li>• Event Date : April 12, 2025</li>
                    <li>• Event Time : 6.00PM – 10.30PM</li>
                </ul>
            </div>

            {/* Right Side - Search & Buttons */}
            <div className="flex flex-col items-end space-y-6">
                {/* Search Bar */}
                <div className="flex items-center border rounded-xl px-3 py-2 w-80">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 outline-none text-sm"
                    />
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 border rounded-xl px-4 py-2 text-sm">
                        <Users className="w-4 h-4" />
                        <span>Attendees: 523</span>
                    </button>
                    <button className="flex items-center space-x-2 border rounded-xl px-4 py-2 text-sm">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleHeader;
