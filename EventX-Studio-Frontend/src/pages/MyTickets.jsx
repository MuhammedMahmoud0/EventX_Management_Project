import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import { getMyTickets } from "../services/ticketService";

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMyTickets()
            .then(setTickets)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading tickets...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Page
            classname="flex bg-black min-h-screen"
            sparse="flex-1 bg-[#F2F2F2] rounded-2xl m-6 p-6 overflow-y-auto"
        >
            <h1>My Tickets</h1>
            {tickets.map((ticket) => (
                <div
                    key={ticket._id}
                    className="bg-white p-4 rounded shadow mb-4"
                >
                    <p>Event: {ticket.eventId.name}</p>
                    <p>Seat: {ticket.seatNumber}</p>
                    <p>Status: {ticket.status}</p>
                    <img
                        src={ticket.qrCode}
                        alt="QR Code"
                        className="w-32 h-32"
                    />
                </div>
            ))}
        </Page>
    );
};

export default MyTickets;
