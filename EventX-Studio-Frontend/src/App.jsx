import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
// import Navbar from "./components/common/Navbar";
// import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserEvent from "./pages/UserEvent";
import Notifications from "./pages/Notifications";
// import EventList from "./pages/EventList";
import EventDetailsPage from "./pages/EventDetailsPage";
import AllAttendeeInsights from "./pages/AllAttendeeInsights";
// import MyTickets from "./pages/MyTickets";
// import Analytics from "./pages/Analytics";
import { isAuthenticated, getUserRole } from "./utils/authUtils";
import SingleEventAttendeeInsights from "./pages/SingleEventAttendeeInsights";

const PrivateRoute = ({ children, role }) => {
    if (!isAuthenticated()) return <Navigate to="/login" replace />;
    if (role && getUserRole() !== role)
        return <div className="p-6">Forbidden</div>;
    return children;
};

const App = () => (
    <Router>
        {/* <Navbar /> */}
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoute role="admin">
                        <AdminDashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/events"
                element={
                    <PrivateRoute>
                        <UserEvent />
                    </PrivateRoute>
                }
            />
            <Route
                path="/events/:id"
                element={
                    <PrivateRoute>
                        <EventDetailsPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/attendee-insights/"
                element={
                    <PrivateRoute>
                        <AllAttendeeInsights />
                    </PrivateRoute>
                }
            />
            <Route
                path="/attendee-insights/:id"
                element={
                    <PrivateRoute>
                        <SingleEventAttendeeInsights />
                    </PrivateRoute>
                }
            />

            {/* <Route
                path="/my-tickets"
                element={
                    <PrivateRoute>
                        <MyTickets />
                    </PrivateRoute>
                }
            />
            <Route
                path="/analytics"
                element={
                    <PrivateRoute role="admin">
                        <Analytics />
                    </PrivateRoute>
                }
            /> */}
            <Route
                path="/"
                element={
                    !isAuthenticated() ? (
                        <Navigate to="/login" />
                    ) : getUserRole() === "admin" ? (
                        <Navigate to="/admin/dashboard" />
                    ) : (
                        <Navigate to="/events" />
                    )
                }
            />
            <Route
                path="/notifications"
                element={
                    <PrivateRoute role="admin">
                        <Notifications />
                    </PrivateRoute>
                }
            />
        </Routes>
        {/* <Footer /> */}
    </Router>
);

export default App;
