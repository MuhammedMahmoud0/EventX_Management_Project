import React, { useState } from "react";
import Page from "../components/common/Page";
import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import Button from "../components/common/Button";
import { createEvent } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css"; // ✅ styles
import "react-clock/dist/Clock.css"; // ✅ required styles

function AddEvent() {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        venue: "",
        time: "",
        timeEnd: "",
        description: "",
        ticketPrice: "",
        totalSeats: "",
        tags: "",
        popularity: "medium",
        status: "upcoming", // default
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    function to12Hour(time24) {
        let [hours, minutes] = time24.split(":");
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // convert 0 -> 12
        return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent({
                ...formData,
                time: to12Hour(formData.time),
                timeEnd: to12Hour(formData.timeEnd),
                ticketPrice: Number(formData.ticketPrice),
                totalSeats: Number(formData.totalSeats),
                tags: formData.tags
                    ? formData.tags.split(",").map((t) => t.trim())
                    : [],
            });
            navigate("/admin/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Error creating event");
        }
    };

    return (
        <Page
            header={<Header />}
            sidebar={<Sidebar />}
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1 className="text-xl font-bold mb-4">Add New Event</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    onChange={handleChange}
                    placeholder="Event Name"
                    className="block w-full p-2 border rounded"
                    required
                />
                <input
                    name="date"
                    type="date"
                    onChange={handleChange}
                    className="block w-full p-2 border rounded"
                    required
                />
                <input
                    name="venue"
                    onChange={handleChange}
                    placeholder="Venue"
                    className="block w-full p-2 border rounded"
                    required
                />
                <TimePicker
                    onChange={(value) =>
                        setFormData({ ...formData, time: value })
                    }
                    value={formData.time}
                    disableClock
                    className="block w-full p-2 border rounded"
                    required
                    clearIcon={null}
                    locale="en-US"
                />
                <TimePicker
                    onChange={(value) =>
                        setFormData({ ...formData, timeEnd: value })
                    }
                    value={formData.timeEnd}
                    disableClock
                    className="block w-full p-2 border rounded"
                    required
                    // clearIcon={null}
                    locale="en-US"
                />
                <textarea
                    name="description"
                    onChange={handleChange}
                    placeholder="Description"
                    className="block w-full p-2 border rounded"
                />
                <input
                    name="ticketPrice"
                    type="number"
                    min="0"
                    onChange={handleChange}
                    placeholder="Ticket Price"
                    className="block w-full p-2 border rounded"
                    required
                />
                <input
                    name="totalSeats"
                    type="number"
                    min="1"
                    onChange={handleChange}
                    placeholder="Total Seats"
                    className="block w-full p-2 border rounded"
                    required
                />
                {/* Status dropdown */}
                <select
                    name="status"
                    onChange={handleChange}
                    value={formData.status}
                    className="block w-full p-2 border rounded"
                    required
                >
                    <option value="upcoming">Upcoming</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                </select>
                <input
                    name="tags"
                    onChange={handleChange}
                    placeholder="Tags (comma-separated)"
                    className="block w-full p-2 border rounded"
                />
                <select
                    name="popularity"
                    onChange={handleChange}
                    value={formData.popularity}
                    className="block w-full p-2 border rounded"
                    required
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <Button type="submit">Create Event</Button>
            </form>
        </Page>
    );
}

export default AddEvent;
