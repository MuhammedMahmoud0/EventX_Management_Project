import React from "react";
import { MoreVertical, ArrowRight } from "lucide-react"; // icons
import {
    FaMicrophone,
    FaMoneyBillAlt,
    FaShoppingCart,
    FaTicketAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EventCard = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-80 space-y-1">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                    <FaMicrophone className="text-gray-700" />
                    <h2 className="font-semibold text-gray-900">
                        Colombo Music Festival
                    </h2>
                </div>
                <MoreVertical
                    className="text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={() => navigate("/events/:id")}
                />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-start space-x-6 text-sm font-medium">
                <div className="flex items-center space-x-1 text-green-600">
                    <FaMoneyBillAlt /> <span>5000LKR</span>
                </div>
                <div className="flex items-center space-x-1 text-red-500">
                    <FaShoppingCart /> <span>2500</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-500">
                    <FaTicketAlt /> <span>1800</span>
                </div>
            </div>

            <hr />

            {/* Venue */}
            <div className="text-sm space-y-2">
                <p>
                    <span className="text-gray-400 font-medium">Venue :</span>{" "}
                    <span className="font-semibold text-gray-800">
                        Open Air Theater, Colombo
                    </span>
                </p>
                <p>
                    <span className="text-gray-400 font-medium">Date :</span>{" "}
                    <span className="font-semibold text-gray-800">
                        12 April 2025
                    </span>
                </p>
                <p>
                    <span className="text-gray-400 font-medium">Time :</span>{" "}
                    <span className="font-semibold text-gray-800">
                        09.00PM to 11.30PM
                    </span>
                </p>
            </div>

            {/* Footer Arrow */}
            <div className="flex justify-end">
                <button className="text-white rounded-full hover:bg-gray-400">
                    <img
                        src="/assets/Event Cards/Arrow.svg"
                        className="w-10 h-10"
                    />
                </button>
            </div>
        </div>
    );
};

export default EventCard;
