import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import Button from "../components/common/Button";
import { getEvents } from "../services/eventService";
import { getMyTickets, getAllTickets } from "../services/ticketService";
import { getUserRole } from "../utils/authUtils";
import { bookTickets } from "../services/eventService";

const Bookings = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [selectedEventDetails, setSelectedEventDetails] = useState(null);
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [myTickets, setMyTickets] = useState([]);
    const [allTickets, setAllTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isAdmin = getUserRole() === "admin";

    // Fetch events, my tickets, and all tickets for admin
    useEffect(() => {
        setLoading(true);
        setError(null);

        Promise.all([
            getEvents(),
            getMyTickets(),
            isAdmin ? getAllTickets() : Promise.resolve([]),
        ])
            .then(([eventsData, myTicketsData, allTicketsData]) => {
                setEvents(eventsData);
                setMyTickets(myTicketsData);
                if (isAdmin) setAllTickets(allTicketsData);
            })
            .catch((err) => {
                console.error("Error loading initial data:", err);
                // setError(err.message);
                setError("Seat has been taken");
            })
            .finally(() => setLoading(false));
    }, [isAdmin]);

    // Update selected event details when event changes
    useEffect(() => {
        if (selectedEvent) {
            const eventDetails = events.find((e) => e._id === selectedEvent);
            setSelectedEventDetails(eventDetails);
            setTicketQuantity(1);
            setSelectedSeats([]);
        } else {
            setSelectedEventDetails(null);
        }
    }, [selectedEvent, events]);

    // Generate seat numbers based on totalSeats
    const generateSeats = (totalSeats) => {
        const seats = [];
        const aCount = Math.floor(totalSeats * 0.2);
        const bCount = Math.floor(totalSeats * 0.3);
        const dCount = totalSeats - aCount - bCount;

        for (let i = 1; i <= aCount; i++) seats.push(`A${i}`);
        for (let i = 1; i <= bCount; i++) seats.push(`B${i}`);
        for (let i = 1; i <= dCount; i++) seats.push(`D${i}`);

        return seats;
    };
    const getAvailableSeatsForIndex = (index) => {
        if (!selectedEventDetails) return [];
        const allSeats = generateSeats(selectedEventDetails.totalSeats);

        return allSeats.filter(
            (seat) =>
                !selectedEventDetails.bookedSeats?.includes(seat) && // not booked
                !selectedSeats.some((s, i) => i !== index && s === seat) // not selected in other dropdowns
        );
    };

    // Available seats based on booked seats
    const availableSeatsOptions = selectedEventDetails
        ? generateSeats(selectedEventDetails.totalSeats).filter(
              (seat) =>
                  !selectedEventDetails.bookedSeats?.includes(seat) ||
                  selectedSeats.includes(seat) // Keep selected seats visible
          )
        : [];

    const handleSeatChange = (index, seat) => {
        const newSeats = [...selectedSeats];
        newSeats[index] = seat;
        setSelectedSeats(newSeats);
    };

    const handleBook = async () => {
        if (!selectedEvent) {
            setError("Please select an event.");
            return;
        }
        if (ticketQuantity < 1) {
            setError("Please select at least one ticket.");
            return;
        }
        if (selectedSeats.length !== ticketQuantity) {
            setError("Please select a seat for each ticket.");
            return;
        }

        try {
            setError(null);

            const bookedTickets = [];
            for (let seat of selectedSeats) {
                const result = await bookTickets({
                    eventId: selectedEvent,
                    seatNumber: seat,
                });
                bookedTickets.push(result.ticket);
            }

            alert(`${ticketQuantity} ticket(s) booked successfully!`);

            // Update bookedSeats locally so they disappear from the selector
            setSelectedEventDetails((prev) => ({
                ...prev,
                bookedSeats: [...(prev.bookedSeats || []), ...selectedSeats],
            }));

            setTicketQuantity(1);
            setSelectedSeats([]);

            // Refresh data for my tickets and all tickets
            const [updatedMyTickets, updatedAllTickets] = await Promise.all([
                getMyTickets(),
                isAdmin ? getAllTickets() : Promise.resolve(allTickets),
            ]);
            setMyTickets(updatedMyTickets);
            if (isAdmin) setAllTickets(updatedAllTickets);
        } catch (err) {
            console.error("Error booking tickets:", err);
            setError(err.response?.data?.message || err.message);
        }
    };

    if (loading) return <p>Loading bookings...</p>;

    return (
        <Page
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1 className="text-2xl font-bold mb-6">Bookings & Tickets</h1>

            {/* Book Tickets Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Book Tickets</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {events.length === 0 ? (
                    <p>No active events available.</p>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Select Event
                            </label>
                            <select
                                value={selectedEvent}
                                onChange={(e) =>
                                    setSelectedEvent(e.target.value)
                                }
                                className="w-full p-2 border rounded"
                            >
                                <option value="">-- Select an Event --</option>
                                {events
                                    .filter(
                                        (e) =>
                                            e.status === "pending" ||
                                            e.status === "upcoming"
                                    )
                                    .map((event) => (
                                        <option
                                            key={event._id}
                                            value={event._id}
                                        >
                                            {event.name} (
                                            {event.date.split("T")[0]}) - $
                                            {event.ticketPrice} per ticket
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Event Details */}
                        {selectedEventDetails && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-medium mb-2">
                                    Event Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <strong>Venue:</strong>{" "}
                                        {selectedEventDetails.venue}
                                    </div>
                                    <div>
                                        <strong>Time:</strong>{" "}
                                        {selectedEventDetails.time}
                                    </div>
                                    <div>
                                        <strong>Price:</strong> $
                                        {selectedEventDetails.ticketPrice} per
                                        ticket
                                    </div>
                                    <div>
                                        <strong>Available Seats:</strong>{" "}
                                        {selectedEventDetails.availableSeats} /{" "}
                                        {selectedEventDetails.totalSeats}
                                    </div>
                                </div>
                                {selectedEventDetails.description && (
                                    <div className="mt-2">
                                        <strong>Description:</strong>{" "}
                                        {selectedEventDetails.description}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Ticket Quantity Selection */}
                        {selectedEventDetails && (
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Number of Tickets
                                </label>
                                <div className="flex items-center gap-4 mb-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setTicketQuantity(
                                                Math.max(1, ticketQuantity - 1)
                                            )
                                        }
                                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 border rounded text-center min-w-[60px]">
                                        {ticketQuantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setTicketQuantity(
                                                Math.min(
                                                    selectedEventDetails.availableSeats,
                                                    ticketQuantity + 1
                                                )
                                            )
                                        }
                                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                    <div className="ml-4 text-sm text-gray-600">
                                        Total: $
                                        {(
                                            selectedEventDetails.ticketPrice *
                                            ticketQuantity
                                        ).toFixed(2)}
                                    </div>
                                </div>

                                {/* Seat Selection */}
                                {Array.from({ length: ticketQuantity }).map(
                                    (_, index) => (
                                        <div
                                            key={index}
                                            className="mb-2 flex items-center gap-2"
                                        >
                                            <label className="block text-gray-700">
                                                Seat {index + 1}
                                            </label>
                                            <select
                                                value={
                                                    selectedSeats[index] || ""
                                                }
                                                onChange={(e) =>
                                                    handleSeatChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="p-2 border rounded flex-1"
                                            >
                                                <option value="">
                                                    -- Select a Seat --
                                                </option>
                                                {getAvailableSeatsForIndex(
                                                    index
                                                ).map((seat) => (
                                                    <option
                                                        key={seat}
                                                        value={seat}
                                                    >
                                                        {seat}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        <Button
                            onClick={handleBook}
                            disabled={
                                !selectedEvent ||
                                ticketQuantity < 1 ||
                                (selectedEventDetails &&
                                    selectedEventDetails.availableSeats === 0)
                            }
                            className={`${
                                !selectedEvent ||
                                ticketQuantity < 1 ||
                                (selectedEventDetails &&
                                    selectedEventDetails.availableSeats === 0)
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            {selectedEventDetails &&
                            selectedEventDetails.availableSeats === 0
                                ? "Sold Out"
                                : `Book ${ticketQuantity} Ticket${
                                      ticketQuantity > 1 ? "s" : ""
                                  }`}
                        </Button>
                    </>
                )}
            </div>

            {/* My Tickets Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">My Tickets</h2>
                {myTickets.length === 0 ? (
                    <p>No tickets booked yet.</p>
                ) : (
                    myTickets.map((ticket) => (
                        <div
                            key={ticket._id}
                            className="border-b py-4 last:border-b-0"
                        >
                            <p>
                                <strong>Event:</strong>{" "}
                                {ticket.eventId?.name || "Unknown Event"}
                            </p>
                            <p>
                                <strong>Seat:</strong> {ticket.seatNumber}
                            </p>
                            <p>
                                <strong>Price:</strong> $
                                {ticket.price || ticket.eventId?.ticketPrice}
                            </p>
                            <p>
                                <strong>Status:</strong> {ticket.status}
                            </p>
                            {ticket.qrCode && (
                                <img
                                    src={ticket.qrCode}
                                    alt="QR Code"
                                    className="w-32 h-32 mt-2"
                                />
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* All Tickets Section (Admin Only) */}
            {isAdmin && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        All Booked Tickets
                    </h2>
                    {allTickets.length === 0 ? (
                        <p>No tickets booked by any user.</p>
                    ) : (
                        allTickets.map((ticket) => (
                            <div
                                key={ticket._id}
                                className="border-b py-4 last:border-b-0"
                            >
                                <p>
                                    <strong>User:</strong>{" "}
                                    {ticket.userId?.name || "Unknown User"} (
                                    {ticket.userId?.email || "N/A"})
                                </p>
                                <p>
                                    <strong>Event:</strong>{" "}
                                    {ticket.eventId?.name || "Unknown Event"}
                                </p>
                                <p>
                                    <strong>Seat:</strong> {ticket.seatNumber}
                                </p>
                                <p>
                                    <strong>Price:</strong> $
                                    {ticket.price ||
                                        ticket.eventId?.ticketPrice}
                                </p>
                                <p>
                                    <strong>Status:</strong> {ticket.status}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </Page>
    );
};

export default Bookings;
