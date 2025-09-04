import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Users, Filter } from "lucide-react";
import { getEvent } from "../../services/eventService"; // Adjust import path as needed

const SingleHeader = () => {
    const { id } = useParams(); // Get event ID from URL parameters
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch event data on component mount
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                setLoading(true);
                setError(null);
                const event = await getEvent(id);
                setEventData(event);
            } catch (err) {
                console.error("Error fetching event:", err);
                setError("Failed to load event details");
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

    const handleBackClick = () => {
        navigate(`/events/${id}`); // Navigate back to event details
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // You can emit this search term to parent component or handle search logic here
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center bg-white p-4 rounded-t-2xl rounded-tr-2xl shadow-sm mt-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-gray-600">
                    Loading event details...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-between bg-white p-4 rounded-t-2xl rounded-tr-2xl shadow-sm mt-8">
                <div className="text-red-600">{error}</div>
                <button
                    onClick={() => navigate("/events")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-start justify-between bg-white p-4 rounded-t-2xl rounded-tr-2xl shadow-sm mt-8">
            {/* Left Side - Event Info */}
            <div>
                <div className="flex items-center space-x-3">
                    <button
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={handleBackClick}
                    >
                        <img
                            src="/assets/Event Cards/Back Arrow.svg"
                            alt="Back"
                            className="w-10 h-10"
                        />
                    </button>
                    <h2 className="text-xl font-bold">
                        Attendee Insights –{" "}
                        {eventData?.name || eventData?.title || "Event"}
                    </h2>
                </div>
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                    <li>
                        • Event Venue :{" "}
                        {eventData?.venue || eventData?.location || "TBD"}
                    </li>
                    <li>
                        • Event Date : {formatDate(eventData?.date) || "TBD"}
                    </li>
                    <li>• Event Time : {eventData?.time || "TBD"}</li>
                </ul>
            </div>

            {/* Right Side - Search & Buttons */}
            <div className="flex flex-col items-end space-y-6">
                {/* Search Bar */}
                <div className="flex items-center border rounded-xl px-3 py-2 w-80">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search attendees..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-1 outline-none text-sm"
                    />
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 border rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                        <Users className="w-4 h-4" />
                        <span>
                            Attendees:{" "}
                            {eventData?.attendeeCount ||
                                eventData?.availableSeats ||
                                "0"}
                        </span>
                    </button>
                    <button className="flex items-center space-x-2 border rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleHeader;
