// import api from "./api";

// export const login = (credentials) => api.post("/auth/login", credentials);
// export const register = (userData) => api.post("/auth/register", userData);
// // test@example.com
// // mohamed123
import api from "./api";

export const login = (credentials) =>
    api.post("/auth/login", credentials).then((res) => res.data);

export const register = (userData) =>
    api.post("/auth/register", userData).then((res) => res.data);
