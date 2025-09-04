import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserEvent from "./pages/UserEvent";
import Notifications from "./pages/Notifications";
import EventDetailsPage from "./pages/EventDetailsPage";
import AllAttendeeInsights from "./pages/AllAttendeeInsights";
import SingleEventAttendeeInsights from "./pages/SingleEventAttendeeInsights";
import MyTickets from "./pages/MyTickets";
import Analytics from "./pages/Analytics";
import AddEvent from "./pages/AddEvent";
import Bookings from "./pages/Bookings";
import Support from "./pages/Support"; // Create similar
import Settings from "./pages/Settings"; // Create similar, use updateMyProfile
import Marketing from "./pages/Marketing"; // Create similar
import EventCategories from "./pages/EventCategories"; // Create similar
import Users from "./pages/Users";
import { isAuthenticated, getUserRole } from "./utils/authUtils";

const PrivateRoute = ({ children, role }) => {
    if (!isAuthenticated()) return <Navigate to="/login" replace />;
    if (role && getUserRole() !== role)
        return <div className="p-6">Forbidden</div>;
    return children;
};

const App = () => (
    <Router>
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
            <Route
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
            />
            <Route
                path="/add-event"
                element={
                    <PrivateRoute role="admin">
                        <AddEvent />
                    </PrivateRoute>
                }
            />
            <Route
                path="/bookings"
                element={
                    <PrivateRoute>
                        <Bookings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/support"
                element={
                    <PrivateRoute>
                        <Support />
                    </PrivateRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/marketing"
                element={
                    <PrivateRoute role="admin">
                        <Marketing />
                    </PrivateRoute>
                }
            />
            <Route
                path="/event-categories"
                element={
                    <PrivateRoute role="admin">
                        <EventCategories />
                    </PrivateRoute>
                }
            />{" "}
            <Route
                path="/users"
                element={
                    <PrivateRoute role="admin">
                        <Users />
                    </PrivateRoute>
                }
            />
            <Route
                path="/notifications"
                element={
                    <PrivateRoute>
                        <Notifications />
                    </PrivateRoute>
                }
            />
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
        </Routes>
    </Router>
);

export default App;
