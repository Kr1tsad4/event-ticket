# 🎟️ Event Booking & Ticketing System (Work in Progress)

A web application for managing events and booking tickets.  
Supports both **Admin** (event management) and **User** (ticket booking) roles.

---

## 🔑 Authentication & User Management
- User registration & login with role-based access (Admin / User). :white_check_mark: 
- Profile page with booking history for each user.
- Role definitions:
  - **Admin**: Create & manage events. 
  - **User**: Browse and book tickets.

---

## 🎤 Event Management
### Admin Features
- CRUD operations for events (title, date & time, location, price, ticket capacity). :white_check_mark: 
- Track number of booked tickets in real time. 

### User Features
- View a list of available events. :white_check_mark: 
- Search & filter events (by date, location, category). :white_check_mark: 
- View event details before booking.

---

## 🏷️ Booking System
- Ticket booking with automatic deduction from event capacity.
- Booking confirmation page.
- Real-time updates when tickets are sold out.

---

## 🛠 Tech Stack
- **Frontend**: React + Tailwind CSS  
- **Backend**: Node.js (Express.js)  
- **Database**: MongoDB
- **Authentication**: JWT  
- **Realtime**: Socket.IO 

---

## 🔮 Future Improvements
- Email notifications for booking confirmation.
- Payment integration.
- QR code for digital ticket check-in.
- Admin analytics dashboard.
