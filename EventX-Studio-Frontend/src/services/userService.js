import api from "./api";

export const getAllUsers = (params = {}) =>
    api.get("/users", { params }).then((res) => res.data);
export const getUser = (id) => api.get(`/users/${id}`).then((res) => res.data);
export const updateUser = (id, data) =>
    api.put(`/users/${id}`, data).then((res) => res.data);
export const deleteUser = (id) =>
    api.delete(`/users/${id}`).then((res) => res.data);
export const getMyProfile = () =>
    api.get("/users/profile").then((res) => res.data);
export const updateMyProfile = (data) =>
    api.put("/users/profile", data).then((res) => res.data);
