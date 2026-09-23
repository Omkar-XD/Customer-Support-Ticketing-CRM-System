# Customer Support Ticketing CRM

A full-stack Customer Support Ticketing CRM built for the Datastraw Technologies technical assessment.

The application helps support teams create, manage, search, filter, and update customer support tickets through a clean and responsive admin dashboard.

---

## Features

### Ticket Management

- Create new customer support tickets
- Automatically generate unique ticket IDs
- Automatically record ticket creation timestamps
- View all support tickets
- View complete ticket details
- Update ticket status
- Add notes/comments to tickets

### Search & Filtering

- Search tickets by customer name
- Search by customer email
- Search by ticket ID
- Search by subject
- Search by description
- Search tickets as the user types
- Filter tickets by status:
  - All Status
  - Open
  - In Progress
  - Closed

### Dashboard

- Total tickets count
- Open tickets count
- In Progress tickets count
- Closed tickets count
- Recent support activity
- Ticket status overview
- Complete support ticket listing

### Ticket Activity Timeline

The application includes a Ticket Activity Timeline that provides a chronological view of important ticket events.

Examples include:

- Ticket created
- Status changed
- Note added

This makes it easier for support staff to understand the history of a ticket instead of only viewing its current status.

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- JavaScript
- Mongoose
- CORS
- dotenv

### Database

- MongoDB Atlas

---

# Project Structure

```text
Customer-Support-Ticketing-CRM-System/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Note.js
│   │   │   └── Ticket.js
│   │   │
│   │   ├── routes/
│   │   │   └── ticketRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── dist/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── AllTickets.jsx
│   │   │   ├── CreateTicket.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── TicketDetails.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
├── .gitignore
├── LICENSE
└── README.md
```

> `dist/` is a generated frontend build directory and should normally be excluded from Git using `.gitignore`.

---

# Prerequisites

Make sure the following are installed:

- Node.js 18+
- npm
- MongoDB Atlas account
- Git

---

# Environment Variables

Sensitive environment variables should not be committed to GitHub.

## Backend

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

Example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/support_crm
```

## Frontend

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

For the GitHub repository, `.env.example` files should contain placeholder values only.

### backend/.env.example

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

### frontend/.env.example

```env
VITE_API_URL=http://localhost:5000
```

---

# MongoDB Atlas Setup

The application uses MongoDB Atlas with Mongoose.

Create a MongoDB Atlas cluster and obtain the MongoDB connection string.

The connection string should be stored in:

```text
backend/.env
```

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/support_crm
```

The application uses MongoDB models for:

- Tickets
- Notes

---

# Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Omkar-XD/Customer-Support-Ticketing-CRM-System.git
```

Move into the project:

```bash
cd Customer-Support-Ticketing-CRM-System
```

---

# 2. Backend Setup

Open a terminal and move into the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Configure the MongoDB connection:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

Start the backend in development mode:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

---

# 3. Frontend Setup

Open another terminal.

Move into the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Vite will provide the frontend URL, normally:

```text
http://localhost:5173
```

---

# API Endpoints

Base API URL:

```text
http://localhost:5000
```

## Create Ticket

```http
POST /api/tickets
```

Request body:

```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Unable to login",
  "description": "Customer cannot access their account."
}
```

The API creates a ticket and returns its generated ticket ID and creation timestamp.

---

## Get All Tickets

```http
GET /api/tickets
```

Returns the available support tickets.

---

## Filter Tickets

```http
GET /api/tickets?status=Open
```

Supported statuses:

```text
Open
In Progress
Closed
```

---

## Search Tickets

```http
GET /api/tickets?search=john
```

Search can be performed across relevant ticket and customer information, including:

- Customer name
- Customer email
- Ticket ID
- Subject
- Description

---

## Get Ticket Details

```http
GET /api/tickets/:ticket_id
```

Example:

```http
GET /api/tickets/TKT-001
```

Returns detailed ticket information and associated notes/activity.

---

## Update Ticket

```http
PUT /api/tickets/:ticket_id
```

Example request:

```json
{
  "status": "In Progress",
  "notes": "Support team has started investigating the issue."
}
```

The endpoint updates the ticket status and can add a note.

---

# Ticket Statuses

The CRM supports three ticket statuses:

| Status | Description |
|---|---|
| Open | Newly created or unresolved ticket |
| In Progress | Ticket is currently being handled by the support team |
| Closed | Ticket has been resolved or completed |

---

# Application Workflow

```text
Create Ticket
      ↓
Ticket ID Generated
      ↓
Ticket Appears on Dashboard
      ↓
Search / Filter Tickets
      ↓
Open Ticket Details
      ↓
Update Status
      ↓
Add Notes
      ↓
Activity Timeline Updated
      ↓
Close Ticket
```

---

# Main Pages

## Dashboard

The dashboard provides an overview of support operations.

It includes:

- Total tickets
- Open tickets
- In Progress tickets
- Closed tickets
- Recent activity
- Ticket status overview
- Support ticket list
- Search
- Status filtering

---

## All Tickets

Displays the complete support ticket list.

Users can:

- Search tickets
- Filter by status
- Open ticket details
- Review ticket information

---

## Create Ticket

Allows support staff to create a new customer support ticket.

Required information:

- Customer name
- Customer email
- Issue subject
- Issue description

---

## Ticket Details

Displays detailed information about a selected ticket.

Users can:

- View customer information
- View issue details
- View ticket metadata
- Update ticket status
- Add notes
- View ticket activity

---

# Bonus Feature — Ticket Activity Timeline

The primary additional feature implemented in this project is the **Ticket Activity Timeline**.

Instead of only showing the current status, the timeline provides chronological context for important actions performed on a ticket.

Example:

```text
● Ticket Created
      ↓
● Status Changed
      ↓
● Note Added
      ↓
● Status Changed
      ↓
● Ticket Closed
```

### Why this feature?

Support teams often need to understand what happened to a ticket before deciding what action to take next.

The activity timeline provides a simple chronological history of important ticket events.

### Trade-off

The implementation focuses on useful ticket activity without introducing unnecessary infrastructure or a complex audit-log system.

---

# Error Handling

The backend handles common API errors such as:

- Missing required fields
- Invalid ticket IDs
- Ticket not found
- Invalid status values
- Database errors
- Invalid API requests

The frontend also provides appropriate loading, empty, and error states.

---

# Security

Sensitive environment variables should never be committed to GitHub.

The following should be ignored:

```text
node_modules/
.env
.env.local
.env.production
dist/
```

Only placeholder values should be included in `.env.example` files.

---

# Deployment

The application is designed for deployment using:

### Frontend

Vercel

### Backend

Render

### Database

MongoDB Atlas

Production environment variables should be configured through the deployment platform.

---

# Live Demo

## Frontend

```text
To be added after deployment
```

## Backend API

```text
To be added after deployment
```

---

# GitHub Repository

```text
https://github.com/Omkar-XD/Customer-Support-Ticketing-CRM-System
```

---

# Future Improvements

Potential future improvements include:

- Authentication and role-based access
- Support agent assignment
- Customer profiles
- Email notifications
- File attachments
- Pagination for larger datasets
- Advanced analytics and reporting
- Real-time ticket updates
- More detailed audit logging

These improvements are intentionally outside the current MVP scope so the core ticketing workflow remains focused and easy to use.

---

# Assessment Focus

The project focuses on delivering a complete end-to-end support ticket workflow:

```text
MongoDB
   ↓
Node.js / Express API
   ↓
React Frontend
   ↓
Create Ticket
   ↓
Search & Filter
   ↓
View Ticket
   ↓
Update Status
   ↓
Add Notes
   ↓
Track Activity
```

The application demonstrates full-stack integration between the database, REST API, and React frontend.

---

# Author

**Omkar Chavan**

GitHub:

```text
https://github.com/Omkar-XD
```

---

# License

This project was developed as part of a technical assessment.
