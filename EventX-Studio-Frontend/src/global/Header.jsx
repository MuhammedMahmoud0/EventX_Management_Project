import React from "react";

const Header = () => {
    return (
        <header className="bg-black rounded-2xl px-6 py-4 flex items-center justify-between shadow-md border border-gray-200 mx-0 my-6">
            {/* Left: Profile + Welcome */}
            <div className="flex items-center space-x-4">
                <img
                    src="/assets/header/Profile.svg"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                />
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Welcome Rusiru De Silva
                    </h1>
                    <p className="text-sm text-white">System Administrator</p>
                </div>
            </div>

            {/* Right: Search + Icons */}
            <div className="flex items-center space-x-3 ml-auto">
                {/* Search Bar */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <img src="/assets/header/Search.svg" alt="" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-76 pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-700 placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2"
                    />
                </div>

                {/* Icons */}
                <button className="p-2 rounded-full hover:bg-gray-100 transition bg-white">
                    <img src="/assets/header/Notification.svg" alt="" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition bg-white">
                    <img src="/assets/header/Event Accepted.svg" alt="" />
                </button>
            </div>
        </header>
    );
};

export default Header;
