import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import {
    FaMicrophone,
    FaMoneyBillAlt,
    FaShoppingCart,
    FaTicketAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../services/eventService"; // ✅ FIXED IMPORT
import { getUserRole } from "../../utils/authUtils";

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );
        if (!confirmed) return;

        try {
            await deleteEvent(event._id);
            window.location.reload(); // reload page after delete
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    const isAdmin = getUserRole() === "admin";

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-80 space-y-1 relative mb-4">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                    <FaMicrophone className="text-gray-700" />
                    <h2 className="font-semibold text-gray-900">
                        {event.name}
                    </h2>
                </div>

                {/* Dropdown Trigger */}
                <div className="relative" ref={menuRef}>
                    <MoreVertical
                        className="text-gray-500 w-5 h-5 cursor-pointer"
                        onClick={() => setOpenMenu(!openMenu)}
                    />

                    {/* Dropdown Menu */}
                    {openMenu && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                            <button
                                onClick={() => navigate(`/events/${event._id}`)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                            >
                                {isAdmin ? "Edit" : "More"}
                            </button>
                            {isAdmin && (
                                <button
                                    onClick={handleDelete}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-start space-x-6 text-sm font-medium">
                <div className="flex items-center space-x-1 text-green-600">
                    <FaMoneyBillAlt /> <span>{event.ticketPrice}</span>
                </div>
                <div className="flex items-center space-x-1 text-red-500">
                    <FaShoppingCart /> <span>{event.totalSeats}</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-500">
                    <FaTicketAlt /> <span>{event.availableSeats}</span>
                </div>
            </div>

            <hr />

            {/* Venue */}
            <div className="text-sm space-y-2">
                <p>
                    <span className="text-gray-400 font-medium">Venue :</span>{" "}
                    <span className="font-semibold text-gray-800">
                        {event.venue}
                    </span>
                </p>
                <p>
                    <span className="text-gray-400 font-medium">Date :</span>{" "}
                    <span className="font-semibold text-gray-800">
                        {event.date.split("T")[0]}
                    </span>
                </p>
                <p>
                    <span className="text-gray-400 font-medium">Time :</span>{" "}
                    <span className="font-semibold text-gray-800">
                        {`${event.time} To ${event.timeEnd}`}
                    </span>
                </p>
            </div>

            {/* Footer Arrow */}
            <div className="flex justify-end">
                <button
                    className="text-white rounded-full hover:bg-gray-400"
                    onClick={() => navigate("/bookings")}
                >
                    <img
                        src="/assets/Event Cards/Arrow.svg"
                        className="w-10 h-10"
                        alt="arrow"
                    />
                </button>
            </div>
        </div>
    );
};

export default EventCard;
