import { Users, Filter, Search, ChevronDown } from "lucide-react";

export default function Header() {
    return (
        <div className="bg-white rounded-2xl px-6 py-6 shadow-md border border-gray-200 mx-0 my-6">
            <div className="flex items-center justify-between">
                {/* Left side - Title with icon */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        All Attendee Insights
                    </h1>
                </div>

                {/* Right side - Controls */}
                <div className="flex items-center space-x-3">
                    {/* Attendees count */}
                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                        <span className="text-sm font-medium text-gray-700">
                            Attendees: 7523
                        </span>
                        <Users className="w-4 h-4 text-gray-500" />
                    </div>

                    {/* Filter button */}
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                            Filter
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* Search bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
