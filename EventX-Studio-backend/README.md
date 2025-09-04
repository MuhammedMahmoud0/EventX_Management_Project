# Event Management Backend

## Overview

This is the backend for an event management system built with Node.js, Express, and MongoDB. It provides a robust API for managing events, tickets, user authentication, seat maps, notifications, and analytics. The system supports user registration, event creation, ticket booking, seat management, and administrative analytics for event organizers.

## Features

-   **User Management**: Register, login, and manage user profiles with role-based access (admin/user).
-   **Event Management**: Create, update, delete, and retrieve events with filtering and sorting capabilities.
-   **Ticket Booking**: Book tickets, generate QR codes, and manage ticket statuses.
-   **Seat Management**: Create and manage seat maps for events, reserve/book seats, and release expired reservations.
-   **Notifications**: Send user-specific, broadcast, and admin notifications for events and bookings.
-   **Analytics**: Provide dashboards and reports for event insights, attendee demographics, and sales data.
-   **Security**: JWT-based authentication, role-based authorization, and secure password hashing with bcrypt.
-   **Error Handling**: Centralized error handling for consistent API responses.

## Tech Stack

-   **Node.js**: Runtime environment for executing JavaScript server-side.
-   **Express**: Web framework for building RESTful APIs.
-   **MongoDB**: NoSQL database for storing data.
-   **Mongoose**: ODM for MongoDB to define schemas and interact with the database.
-   **JWT**: JSON Web Tokens for authentication.
-   **Bcrypt**: For secure password hashing.
-   **QRCode**: Library for generating QR codes for tickets.
-   **Joi**: For input validation (e.g., event creation).
-   **Helmet**: For securing HTTP headers.
-   **Morgan**: For HTTP request logging.
-   **CORS**: For enabling cross-origin requests.

## Project Structure

```
src
├── config
│   └── db.js               # MongoDB connection setup
├── controllers
│   ├── analyticsController.js # Analytics and reporting endpoints
│   ├── authController.js      # User authentication (register, login)
│   ├── eventController.js     # Event management endpoints
│   ├── notificationController.js # Notification handling
│   ├── seatMapController.js   # Seat map management
│   ├── ticketController.js    # Ticket booking and management
│   └── userController.js      # User profile and admin user management
├── middlewares
│   ├── authMiddleware.js      # JWT authentication and admin authorization
│   └── errorHandler.js        # Centralized error handling
├── models
│   ├── Event.js              # Event schema
│   ├── Notification.js        # Notification schema
│   ├── SeatMap.js            # Seat map schema
│   ├── Ticket.js             # Ticket schema
│   └── User.js               # User schema
├── routes
│   ├── analyticsRoutes.js    # Analytics API routes
│   ├── authRoutes.js         # Authentication routes
│   ├── eventRoutes.js        # Event management routes
│   ├── notificationRoutes.js # Notification routes
│   ├── seatMapRoutes.js      # Seat map routes
│   ├── ticketRoutes.js       # Ticket routes
│   └── userRoutes.js         # User management routes
├── utils
│   ├── qrGenerator.js        # QR code generation utility
│   └── validators.js         # Joi validation schemas
├── server.js                 # Main server entry point
├── .gitignore
├── .env                      # Environment variables (not included in repo)
└── README.md
```

## Prerequisites

-   Node.js (v14 or higher)
-   MongoDB (local or cloud, e.g., MongoDB Atlas)
-   npm or yarn
-   Environment variables (see `.env` section below)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/MuhammedMahmoud0/EventX_Management
    cd event-management-backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following:

    ```plaintext
    PORT=5000
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    NODE_ENV=development
    ```

    - `MONGO_URI`: MongoDB connection string (e.g., `mongodb://localhost/event-management` or Atlas URI).
    - `JWT_SECRET`: A secure string for signing JWTs.
    - `NODE_ENV`: Set to `production` for production environments.

4. **Start the server**:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

Below is a summary of the main API endpoints. All routes are prefixed with `/api`.

### Authentication (`/api/auth`)

-   `POST /register`: Register a new user (name, email, password, role, age, gender, location, interests).
-   `POST /login`: Login user and return JWT token.

### Events (`/api/events`)

-   `GET /`: Get all events (supports filtering by status, search, and sorting by date, ticketPrice, or popularity). Requires authentication.
-   `POST /`: Create a new event (admin only).
-   `GET /:id`: Get event by ID.
-   `PUT /:id`: Update event (admin only).
-   `DELETE /:id`: Delete event (admin only).
-   `PUT /:id/seats`: Update event seats manually (admin only).
-   `POST /events/tickets`: Book tickets for an event.

### Tickets (`/api/tickets`)

-   `POST /book`: Book a ticket for an event (generates QR code).
-   `GET /my`: Get tickets for the authenticated user.
-   `GET /event/:eventId`: Get all tickets for a specific event (admin only).
-   `PUT /:id`: Update a ticket (admin only).
-   `GET /all`: Get all tickets (admin only).

### Seat Maps (`/api/seatmaps`)

-   `POST /`: Create a seat map for an event (admin only).
-   `GET /:eventId`: Get seat map for an event.
-   `GET /:eventId/available`: Get available seats (optional category filter).
-   `GET /:eventId/seat/:seatNumber`: Get details for a specific seat.
-   `POST /reserve`: Reserve seats temporarily.
-   `POST /book`: Book reserved seats.
-   `DELETE /:eventId/seat/:seatNumber`: Release a seat.
-   `PUT /:eventId`: Update seat map (admin only).

### Users (`/api/users`)

-   `GET /profile`: Get authenticated user's profile and stats (tickets, unread notifications).
-   `PUT /profile`: Update authenticated user's profile.
-   `GET /`: Get all users (admin only, supports pagination, role filter, and search).
-   `GET /:id`: Get user by ID (admin only).
-   `PUT /:id`: Update user (admin only).
-   `DELETE /:id`: Delete user (admin only).

### Notifications (`/api/notifications`)

-   `GET /`: Get notifications for the authenticated user (supports pagination and unreadOnly filter).
-   `PUT /:id/read`: Mark a notification as read.
-   `PUT /read-all`: Mark all notifications as read.
-   `DELETE /:id`: Delete a notification.
-   `DELETE /`: Clear all notifications for the user.

### Analytics (`/api/analytics`)

-   `GET /dashboard`: Get admin dashboard stats (event count, bookings, revenue, upcoming events).
-   `GET /attendees`: Get attendee demographics for an event (age, gender, location).
-   `GET /reports`: Get sales reports by date.
-   `GET /insights`: Get detailed event insights (attendees, social media metrics).

### Health Check

-   `GET /api/health`: Check server status, uptime, and timestamp.

## Models

-   **User**: Stores user data (name, email, password, role, age, gender, location, interests).
-   **Event**: Stores event details (name, date, venue, time, ticketPrice, seats, etc.).
-   **Ticket**: Stores ticket information (userId, eventId, seatNumber, QR code, status, price).
-   **SeatMap**: Stores seat map data for events (sections, seats, status, pricing).
-   **Notification**: Stores user notifications (title, message, type, priority, read status).

## Security

-   **Authentication**: Uses JWT tokens stored in the `Authorization: Bearer <token>` header.
-   **Authorization**: Admin-only routes are protected with the `admin` middleware.
-   **Input Validation**: Joi is used to validate event creation data.
-   **Password Security**: Passwords are hashed using bcrypt.
-   **HTTP Security**: Helmet adds secure headers, and CORS enables cross-origin requests.
-   **Error Handling**: Centralized error handler logs errors and returns consistent responses.

## Error Handling

Errors are handled by the `errorHandler.js` middleware, which returns JSON responses with:

-   `message`: Error description.
-   `stack`: Stack trace (omitted in production).

Common status codes:

-   `200`: Success
-   `201`: Resource created
-   `400`: Bad request (validation errors, missing data)
-   `401`: Unauthorized (invalid/missing token)
-   `403`: Forbidden (insufficient permissions)
-   `404`: Resource not found
-   `500`: Server error

## Development

-   **Logging**: Morgan logs HTTP requests in `dev` format.
-   **Environment**: Set `NODE_ENV=production` for production to disable stack traces.
-   **MongoDB**: Ensure MongoDB is running locally or use a cloud provider like MongoDB Atlas.

## Testing

To test the API, use tools like Postman or cURL. Example:

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","email":"john@example.com","password":"password123","age":25,"gender":"male","location":"New York","interests":["music","sports"]}'
```

## Future Improvements

-   Add rate limiting to prevent API abuse.
-   Implement email notifications for bookings and events.
-   Add support for multiple ticket types (e.g., VIP, standard).
-   Enhance analytics with more detailed reports and visualizations.
-   Add unit and integration tests using Jest or Mocha.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m "Add YourFeature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
