// import api from "./api";

// export const getAnalytics = () =>
//     api.get("/analytics/dashboard").then((res) => res.data);

import api from "./api";

export const getAnalytics = () =>
    api.get("/analytics/dashboard").then((res) => res.data);

export const getAttendees = (eventId) =>
    api
        .get("/analytics/attendees", { params: { eventId } })
        .then((res) => res.data);

export const getEventInsights = (eventId) =>
    api
        .get("/analytics/insights", { params: { eventId } })
        .then((res) => res.data);

export const getReports = (params = {}) =>
    api.get("/analytics/reports", { params }).then((res) => res.data);
