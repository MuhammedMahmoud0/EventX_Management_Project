import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getEvent, updateEvent } from "../../services/eventService"; // Adjust import path as needed
import { getUserRole } from "../../utils/authUtils";

const EventDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get event ID from URL parameters
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [eventData, setEventData] = useState({
        name: "",
        date: "",
        venue: "",
        time: "",
        description: "",
        ticketPrice: "",
        seatAmount: "",
        availableSeats: "",
        popularity: "",
        expectedAttendance: "",
        tags: "",
    });

    // Fetch event data on component mount
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                setLoading(true);
                setError(null);
                const event = await getEvent(id);

                // Map API response to component state structure
                setEventData({
                    name: event.name || event.title || "",
                    date: event.date || "",
                    venue: event.venue || event.location || "",
                    time: event.time || "",
                    description: event.description || "",
                    ticketPrice: event.ticketPrice || event.price || "",
                    seatAmount: event.seatAmount || event.totalSeats || "",
                    availableSeats: event.availableSeats || "",
                    popularity: event.popularity || "",
                    expectedAttendance:
                        event.expectedAttendance || event.capacity || "",
                    tags: event.tags || "",
                });
            } catch (err) {
                console.error("Error fetching event:", err);
                setError("Failed to load event details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchEventData();
        } else {
            setLoading(false);
            setError("No event ID provided");
        }
    }, [id]);

    const handleInputChange = (field, value) => {
        setEventData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            // Prepare data for API - map back to expected API format
            const updateData = {
                name: eventData.name,
                date: eventData.date,
                venue: eventData.venue,
                time: eventData.time,
                description: eventData.description,
                ticketPrice: eventData.ticketPrice,
                seatAmount: parseInt(eventData.seatAmount) || 0,
                availableSeats: parseInt(eventData.availableSeats) || 0,
                popularity: eventData.popularity,
                expectedAttendance: eventData.expectedAttendance,
                tags: eventData.tags,
            };

            await updateEvent(id, updateData);
            setIsEditing(false);

            // Show success message (you can implement a toast/notification system)
            alert("Event updated successfully!");
        } catch (err) {
            console.error("Error updating event:", err);
            alert("Failed to update event. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleEdit = () => {
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
        }
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

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => navigate("/events")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }
    const isAdmin = getUserRole() === "admin";

    return (
        <div className="w-full h-full p-10 bg-white rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    className="flex items-center text-gray-600 hover:text-gray-800"
                    onClick={() => navigate("/events")}
                >
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
                        {isAdmin && (
                            <button
                                onClick={toggleEdit}
                                disabled={loading}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? "SAVING..."
                                    : isEditing
                                    ? "SAVE"
                                    : "EDIT"}
                            </button>
                        )}
                        <button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                            onClick={() => navigate(`/attendee-insights/${id}`)}
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
