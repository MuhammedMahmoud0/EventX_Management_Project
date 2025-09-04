import api from "./api";

export const createSeatMap = (data) =>
    api.post("/seatmaps", data).then((res) => res.data);

// export const getSeatMap = (eventId) =>
//     api.get(`/seatmaps/${eventId}`).then((res) => res.data);

export const getAvailableSeats = (eventId, params = {}) =>
    api
        .get(`/seatmaps/${eventId}/available`, { params })
        .then((res) => res.data);

export const reserveSeats = (data) =>
    api.post("/seatmaps/reserve", data).then((res) => res.data);

// export const bookSeats = (data) =>
//     api.post("/seatmaps/book", data).then((res) => res.data);

export const releaseSeat = (eventId, seatNumber) =>
    api
        .delete(`/seatmaps/${eventId}/seat/${seatNumber}`)
        .then((res) => res.data);

export const updateSeatMap = (eventId, data) =>
    api.put(`/seatmaps/${eventId}`, data).then((res) => res.data);

export const getSeatDetails = (eventId, seatNumber) =>
    api.get(`/seatmaps/${eventId}/seat/${seatNumber}`).then((res) => res.data);

export const bookSeats = async (data) => {
    const response = await api.post("/events/book-tickets", data);
    return response.data;
};
export const getSeatMap = async (eventId) => {
    const response = await api.get(`/seatmaps/${eventId}`);
    return response.data;
};
