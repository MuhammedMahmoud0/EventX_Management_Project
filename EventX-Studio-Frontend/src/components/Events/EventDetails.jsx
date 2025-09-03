import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Edit3,
    MapPin,
    Clock,
    Calendar,
    Users,
    Star,
    ShoppingCart,
    Eye,
    Tag,
} from "lucide-react";

const EventDetails = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [eventData, setEventData] = useState({
        name: "Colombo Music Festival 2025",
        date: "2025-04-12",
        venue: "Viharamahadevi Open Air Theater, Colombo",
        time: "6:00PM - 10:30PM",
        description:
            "Get ready for Sri Lanka's biggest music festival – the Colombo Music Festival 2025! 🎵🔥 This electrifying open-air concert will feature top international and local artists, bringing an unforgettable night of music, lights, and energy to the heart of Colombo! Join 10,000+ music lovers at the Viharamahadevi Open Air Theater for a night filled with live performances, immersive stage effects, and a festival atmosphere like no other! Whether you're into pop, rock, EDM, or reggae, this festival has something for every music enthusiast!",
        ticketPrice: "2500LKR",
        seatAmount: "1200",
        availableSeats: "523",
        popularity: "High Popularity",
        expectedAttendance: "+1000",
        tags: "#Music, #Festival",
    });

    const handleInputChange = (field, value) => {
        setEventData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const seatData = Array.from({ length: 80 }, (_, i) => {
        const random = Math.random();
        if (random < 0.4) return "paid";
        if (random < 0.7) return "reserved";
        return "available";
    });

    const renderSeat = (status, index) => {
        const baseClass = "w-6 h-6 rounded-sm ";
        const statusClass = {
            paid: "bg-purple-600",
            reserved: "bg-purple-400",
            available: "bg-gray-300",
        };
        return (
            <div key={index} className={baseClass + statusClass[status]}></div>
        );
    };

    return (
        <div className="w-full h-full p-10 bg-white rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button className="flex items-center text-gray-600 hover:text-gray-800">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </button>
                <h1 className="text-2xl font-bold">Event Details</h1>
                <div></div>
            </div>

            {/* Event Name and Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Name
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={eventData.name}
                            onChange={(e) =>
                                handleInputChange("name", e.target.value)
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Edit3 className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Date
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            value={eventData.date}
                            onChange={(e) =>
                                handleInputChange("date", e.target.value)
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                        />
                        {!isEditing && (
                            <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                        )}
                    </div>
                </div>
            </div>

            {/* Event Venue and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Venue
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={eventData.venue}
                            onChange={(e) =>
                                handleInputChange("venue", e.target.value)
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Time
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={eventData.time}
                            onChange={(e) =>
                                handleInputChange("time", e.target.value)
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Event Description */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Description
                </label>
                <textarea
                    value={eventData.description}
                    onChange={(e) =>
                        handleInputChange("description", e.target.value)
                    }
                    disabled={!isEditing}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ticket Price
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={eventData.ticketPrice}
                            onChange={(e) =>
                                handleInputChange("ticketPrice", e.target.value)
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="absolute right-3 top-3 w-5 h-5 text-gray-400">
                            ₨
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seat Amount
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={eventData.seatAmount}
                            onChange={(e) =>
                                handleInputChange("seatAmount", e.target.value)
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ShoppingCart className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Seats
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={eventData.availableSeats}
                            onChange={(e) =>
                                handleInputChange(
                                    "availableSeats",
                                    e.target.value
                                )
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Eye className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Popularity
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={eventData.popularity}
                            onChange={(e) =>
                                handleInputChange("popularity", e.target.value)
                            }
                            disabled={!isEditing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Star className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Seat Allocation */}
                <div className="lg:col-span-2 flex flex-col h-full">
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 grid place-items-center">
                            Seat Allocation
                        </h3>
                        {/* Legend */}
                        <div className="flex flex-wrap gap-6 mb-6 text-sm flex-row justify-center">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-purple-600 rounded-sm"></div>
                                <span className="text-gray-700">
                                    Paid Seats
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-purple-400 rounded-sm"></div>
                                <span className="text-gray-700">
                                    Reserved Seats
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                                <span className="text-gray-700">Available</span>
                            </div>
                        </div>

                        {/* Seat Grid */}
                        <div className="grid grid-cols-10 gap-1 max-w-md mx-auto">
                            {seatData.map((status, index) =>
                                renderSeat(status, index)
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Tags, QR, Buttons */}
                <div className="flex flex-col justify-between space-y-6">
                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={eventData.tags}
                                onChange={(e) =>
                                    handleInputChange("tags", e.target.value)
                                }
                                disabled={!isEditing}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <Tag className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Expected Attendance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Attendance
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={eventData.expectedAttendance}
                                onChange={(e) =>
                                    handleInputChange(
                                        "expectedAttendance",
                                        e.target.value
                                    )
                                }
                                disabled={!isEditing}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:bg-gray-50 disabled:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <Users className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                        <div className="w-24 h-24 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <div className="grid grid-cols-8 gap-px">
                                {Array.from({ length: 64 }, (_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1 h-1 ${
                                            Math.random() > 0.5
                                                ? "bg-black"
                                                : "bg-white"
                                        }`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                            Scan QR code for easy payments
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-auto">
                        <button
                            onClick={toggleEdit}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                        >
                            {isEditing ? "SAVE" : "EDIT"}
                        </button>
                        <button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                            onClick={() => navigate("/attendee-insights/:id")}
                        >
                            Attendee Insights
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
