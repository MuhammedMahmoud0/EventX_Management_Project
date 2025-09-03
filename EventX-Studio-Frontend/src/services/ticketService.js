// import api from "./api";

// export const bookTicket = (bookingData) =>
//     api.post("/tickets/book", bookingData).then((res) => res.data);
// export const getMyTickets = () =>
//     api.get("/tickets/my").then((res) => res.data);
import api from "./api";

export const bookTicket = (bookingData) =>
    api.post("/tickets/book", bookingData).then((res) => res.data);

export const getMyTickets = () =>
    api.get("/tickets/my").then((res) => res.data);

export const getEventTickets = (eventId) =>
    api.get(`/tickets/event/${eventId}`).then((res) => res.data);
