# Event Management Frontend

## Overview
This is the frontend for an Event Management System, built with **React**, **Vite**, **Tailwind CSS**, and **React Router**. It provides a user-friendly interface for managing events, booking tickets, viewing notifications, and accessing analytics. The application supports two user roles: **users** (who browse events and book tickets) and **admins** (who manage events, users, and analytics). The frontend communicates with a backend API (assumed to be running at `http://localhost:5000/api`) to handle data operations.

## Features
- **User Authentication**: Register and login functionality with JWT-based authentication.
- **Event Browsing**: View upcoming events, filter by status/date/name, and search for events.
- **Event Details**: Display detailed event information, including venue, date, time, ticket price, and seat availability.
- **Ticket Booking**: Interactive seat picker for selecting and reserving seats.
- **Notifications**: Display user-specific notifications with a "See All" option.
- **Analytics**: Admin dashboard with visualizations (bar, line, donut, and lollipop charts) for attendee demographics, sales, and social media engagement.
- **Seat Management**: Visual seat map for events, showing paid, reserved, and available seats.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.
- **QR Code Generation**: Generate QR codes for ticket payments.
- **Role-Based Access**: Admins can create/delete events, view analytics, and manage users, while users can book tickets and view their profiles.

## Tech Stack
- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend API.
- **JWT Decode**: For decoding JWT tokens to extract user roles.
- **QRCode**: Library for generating QR codes.
- **Nivo**: For rendering charts (bar, lollipop).
- **Recharts**: For rendering line and donut charts.
- **Lucide React**: Icon library for UI components.
- **React Icons**: Additional icons for event cards.

## Project Structure
```
src/
├── assets/                     # Static assets (images, icons)
├── common/                     # Reusable components (e.g., Button)
├── pages/                      # Page components
│   ├── AdminDashboard.jsx      # Admin dashboard with analytics
│   ├── Analytics.jsx           # Analytics visualizations
│   ├── Bookings.jsx            # Ticket booking page
│   ├── EventCategories.jsx     # Event category management (admin)
│   ├── EventDetailsPage.jsx    # Event details page
│   ├── Login.jsx               # Login page
│   ├── MyTickets.jsx           # User's tickets page
│   ├── Notifications.jsx       # Notifications page
│   ├── Register.jsx            # Registration page
│   ├── Settings.jsx            # User settings page
│   ├── Support.jsx             # Support page
│   ├── UserEvent.jsx           # User event browsing page
│   ├── AllAttendeeInsights.jsx # Attendee insights for all events
│   ├── SingleEventAttendeeInsights.jsx # Attendee insights for a single event
│   └── AddEvent.jsx            # Add new event page (admin)
├── services/                   # API service functions
│   ├── authService.js          # Authentication API calls (login, register)
│   ├── eventService.js         # Event-related API calls
│   └── notificationService.js  # Notification-related API calls
├── utils/                      # Utility functions
│   ├── authUtils.js            # Authentication utilities (JWT handling, logout)
│   └── qrUtils.js              # QR code generation utility
├── components/                 # Reusable UI components
│   ├── AnalyticsCards.jsx      # Cards for analytics metrics
│   ├── AttendeeLocationsCard.jsx # Card for attendee locations
│   ├── BarChart.jsx            # Bar chart for attendee locations
│   ├── Card.jsx                # Generic card component
│   ├── DonutChart.jsx          # Donut chart for analytics
│   ├── EventCard.jsx           # Card for displaying events
│   ├── EventDetails.jsx        # Event details component
│   ├── EventStatusLegend.jsx   # Legend for event statuses
│   ├── LatestEvent.jsx         # Latest event with seat map
│   ├── LineChart.jsx           # Line chart for sales data
│   ├── LolipopChart.jsx        # Lollipop chart for attendee age
│   ├── Navbar.jsx              # Event management header with filters
│   ├── Notifications.jsx       # Notifications component
│   ├── RegisterForm.jsx        # Registration form
│   ├── SeatPicker.jsx          # Interactive seat picker
│   └── SocialMediaCard.jsx     # Social media engagement metrics
├── App.jsx                     # Main app with routing
├── main.jsx                    # Entry point for React
└── index.css                   # Global styles with Tailwind CSS
```

## Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Backend API** running at `http://localhost:5000/api` (or configured via `VITE_API_URL` environment variable)

## Installation
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd event-management-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following:
   ```plaintext
   VITE_API_URL=http://localhost:5000/api
   ```
   - `VITE_API_URL`: The base URL of the backend API.

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will run at `http://localhost:5173` (or the port specified by Vite).

## Usage
- **Login/Register**: Access the app via `/login` or `/register`. Users are redirected to `/events` (user dashboard) or `/admin/dashboard` (admin dashboard) based on their role.
- **Event Browsing**: The `/events` page displays event cards with details like ticket price, seats, and venue. Users can filter by status, date, or name and search for events.
- **Event Details**: Navigate to `/events/:id` to view detailed event information and book tickets using the seat picker.
- **Analytics**: Admins can access `/analytics` for visualizations (e.g., attendee age, location, sales) and `/attendee-insights` for detailed insights.
- **Notifications**: View recent notifications at `/notifications` or in the dashboard component.
- **Ticket Booking**: Use the `SeatPicker` component to select seats and generate QR codes for payments.
- **Admin Features**: Admins can add new events (`/add-event`), manage users (`/users`), and view analytics.

## Component Overview
- **AnalyticsCards.jsx**: Displays cards with attendee metrics (age, gender, location, interests, engagement) with trend indicators.
- **AttendeeLocationsCard.jsx**: Table showing attendee locations with counts and color-coded indicators.
- **BarChart.jsx**: Bar chart for visualizing attendee locations.
- **Card.jsx**: Generic card for displaying metrics with icons.
- **DonutChart.jsx**: Donut chart for percentage-based analytics (e.g., attendee demographics).
- **EventCard.jsx**: Displays event details with options to delete (admin only) or view bookings.
- **EventDetails.jsx**: Shows detailed event information with an editable form (admin only) and QR code for payments.
- **EventStatusLegend.jsx**: Legend for event statuses (upcoming, pending, closed).
- **LatestEvent.jsx**: Displays the latest event with a seat map (paid, reserved, empty seats).
- **LineChart.jsx**: Line chart for sales data with percentage share and metrics (revenue, tickets sold, events hosted).
- **LolipopChart.jsx**: Lollipop chart for attendee age distribution.
- **Navbar.jsx**: Header with event management controls (new event, attendee insights, filters, search, date picker).
- **Notifications.jsx**: Displays the latest 5 notifications with a "See All" link.
- **RegisterForm.jsx**: Form for user registration with fields for name, email, password, age, gender, location, and interests.
- **SeatPicker.jsx**: Interactive component for selecting seats in a grid layout.
- **SocialMediaCard.jsx**: Displays social media engagement metrics (Instagram, Facebook, Twitter, QR scans).
- **App.jsx**: Defines routes for all pages with private route protection.
- **main.jsx**: Entry point for rendering the React app.
- **authService.js**: Handles login and register API calls.
- **api.js**: Configures Axios with token-based authentication.
- **authUtils.js**: Utilities for checking authentication and user roles.
- **qrUtils.js**: Generates QR codes for tickets.

## API Integration
The frontend interacts with the backend API (configured via `VITE_API_URL`) using Axios. Key services include:
- **authService.js**: Handles `/auth/login` and `/auth/register` endpoints.
- **eventService.js**: Fetches event data, creates/updates/deletes events, and manages bookings.
- **notificationService.js**: Retrieves user notifications.
- **api.js**: Automatically adds JWT tokens to requests via Axios interceptors.

## Styling
- **Tailwind CSS**: Used for responsive, utility-first styling.
- **Custom Styles**: Defined in `index.css` for global styles (e.g., body background).
- **Responsive Design**: Components are optimized for various screen sizes using Tailwind's responsive classes.

## Security
- **JWT Authentication**: Tokens are stored in `localStorage` and included in API requests via Axios interceptors.
- **Role-Based Access**: `PrivateRoute` component restricts access to pages based on user roles (`admin` or `user`).
- **Input Validation**: Handled on the backend, with frontend displaying error messages from API responses.

## Development
- **Run Development Server**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
  Outputs are generated in the `dist` folder.
- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## Testing
- Use tools like **Postman** or **cURL** to test backend API endpoints.
- For frontend testing, consider adding **Jest** and **React Testing Library** for unit and integration tests.

Example API test:
```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","email":"john@example.com","password":"password123","age":25,"gender":"male","location":"Colombo","interests":["music","sports"]}'
```

## Future Improvements
- Add unit and integration tests using Jest/React Testing Library.
- Implement real-time notifications using WebSockets.
- Enhance accessibility (ARIA labels, keyboard navigation).
- Add loading spinners and skeleton screens for better UX.
- Support multiple languages using i18n.
- Optimize performance with lazy loading for routes and components.
- Add error boundaries for robust error handling.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m "Add YourFeature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License.