import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { logout } from "../utils/authUtils";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/authUtils";

const SidebarSection = ({ title, children }) => {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <hr />
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center text-sm text-white mb-2 uppercase hover:text-white font-bold"
            >
                <span>{title}</span>
                {open ? (
                    <ChevronDown className="w-4 h-4 transition-transform" />
                ) : (
                    <ChevronRight className="w-4 h-4 transition-transform" />
                )}
            </button>
            {open && <div className="space-y-2">{children}</div>}
        </div>
    );
};

const Sidebar = () => {
    const navigate = useNavigate();
    const isAdmin = getUserRole() === "admin";
    return (
        <aside className="w-64 h-screen bg-black text-white flex flex-col p-4 space-y-3">
            <img src="/assets/sidebar/logo.svg" alt="" className="w-45 h-25" />
            {/* Quick Event Button */}
            <div>
                {isAdmin && (
                    <button
                        className="add-event w-full flex items-center gap-3 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => navigate("/add-event")}
                    >
                        <img
                            src="/assets/sidebar/Frame 1.svg"
                            alt="Add"
                            className="w-8 h-8"
                        />
                        <div className="flex flex-col items-start leading-tight">
                            <span className="font-semibold">
                                Add Quick Event
                            </span>
                            <span className="text-sm font-normal text-gray-300">
                                Events
                            </span>
                        </div>
                    </button>
                )}
                <br />
            </div>
            {/* Main Navigation */}
            <SidebarSection title="Main Navigation">
                <ul className="space-y-1">
                    {isAdmin && (
                        <li
                            onClick={() => navigate("/admin/dashboard")}
                            className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                        >
                            <img
                                src="/assets/sidebar/Control Panel.svg"
                                alt=""
                                className="w-8 h-8"
                            />
                            <span>Dashboard</span>
                        </li>
                    )}
                    <li
                        className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                        onClick={() => navigate("/events")}
                    >
                        <img
                            src="/assets/sidebar/Event Accepted.svg"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span>Manage Events</span>
                    </li>
                    <li
                        className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight text-white"
                        onClick={() => navigate("/bookings")}
                    >
                        <img
                            src="/assets/sidebar/New Ticket.svg"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span>Booking & Tickets</span>
                    </li>
                    <li
                        className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                        onClick={() => navigate("/attendee-insights")}
                    >
                        <img
                            src="/assets/sidebar/Collaborating In Circle.svg"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span>Attendee Insights</span>
                    </li>
                    {isAdmin && (
                        <li
                            className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                            onClick={() => navigate("/analytics")}
                        >
                            <img
                                src="/assets/sidebar/Statistics.svg"
                                alt=""
                                className="w-8 h-8"
                            />
                            <span>Analytics & Reports</span>
                        </li>
                    )}
                </ul>
            </SidebarSection>
            {/* Support & Management */}
            <SidebarSection title="Support & Management">
                <ul className="space-y-1">
                    <li
                        className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                        onClick={() => navigate("/support")}
                    >
                        <img
                            src="/assets/sidebar/Customer Support.svg"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span>Contact Support</span>
                    </li>
                    <li
                        className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                        onClick={() => navigate("/notifications")}
                    >
                        <img
                            src="/assets/sidebar/Add Reminder.svg"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span>Notifications</span>
                    </li>
                    <li
                        className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                        onClick={() => navigate("/settings")}
                    >
                        <img
                            src="/assets/sidebar/Settings.svg"
                            alt=""
                            className="w-8 h-8"
                        />
                        <span>Settings</span>
                    </li>
                </ul>
            </SidebarSection>

            {/* Additional Features */}
            {isAdmin && (
                <SidebarSection title="Additional Features">
                    <ul className="space-y-1">
                        <li
                            className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                            onClick={() => navigate("/marketing")}
                        >
                            <img
                                src="/assets/sidebar/Speaker.svg"
                                alt=""
                                className="w-8 h-8"
                            />
                            <span>Markting</span>
                        </li>
                        <li
                            className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                            onClick={() => navigate("/event-categories")}
                        >
                            <img
                                src="/assets/sidebar/Opened Folder.svg"
                                alt=""
                                className="w-8 h-8"
                            />
                            <span>Event Categories</span>
                        </li>
                    </ul>
                </SidebarSection>
            )}
            {/* Account Management */}
            <SidebarSection title="Account Management">
                <ul className="space-y-1">
                    {isAdmin && (
                        <li
                            className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight"
                            onClick={() => navigate("/users")}
                        >
                            <img
                                src="/assets/sidebar/Add User Male.svg"
                                alt=""
                                className="w-8 h-8"
                            />
                            <span>User Management</span>
                        </li>
                    )}
                    <button onClick={logout} className="w-full">
                        <li className="flex items-center gap-3 hover:bg-gray-800 p-[3px] rounded cursor-pointer text-sm/13 leading-tight">
                            <img
                                src="/assets/sidebar/Logout.svg"
                                alt=""
                                className="w-8 h-8"
                            />
                            <span>Logout</span>
                        </li>
                    </button>
                </ul>
            </SidebarSection>
        </aside>
    );
};

export default Sidebar;
