import api from "./api";

export const getEvents = (filters = {}) =>
    api.get("/events", { params: filters }).then((res) => res.data);

export const getEvent = (id) =>
    api.get(`/events/${id}`).then((res) => res.data);

export const createEvent = (eventData) =>
    api.post("/events", eventData).then((res) => res.data);

export const updateEvent = (id, eventData) =>
    api.put(`/events/${id}`, eventData).then((res) => res.data);

export const deleteEvent = (id) =>
    api.delete(`/events/${id}`).then((res) => res.data);

// export const bookTickets = (data) =>
//     api.post("/events/book-tickets", data).then((res) => res.data);
export const bookTickets = (data) =>
    api.post("/tickets/book", data).then((res) => res.data);
