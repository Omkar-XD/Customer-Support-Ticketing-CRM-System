Customer Support Ticketing CRM

A full-stack Customer Support Ticketing CRM built for the Datastraw
Technologies technical assessment.

The application allows a support team to create, search, filter, view,
update, and manage customer support tickets through a clean admin
dashboard.

Features

Ticket Management

Create customer support tickets

Automatically generate ticket IDs

Record ticket creation timestamps

View all tickets

View complete ticket details

Update ticket status

Add notes/comments to tickets

Search & Filtering

Search tickets by customer name, email, ticket ID, subject, and
description

Search while typing

Filter tickets by status:

All Status

Open

In Progress

Closed

Dashboard

Total ticket count

Open ticket count

In Progress ticket count

Closed ticket count

Recent support activity

Ticket status overview

Support ticket listing

Ticket Activity

The application includes a ticket activity timeline that provides
chronological context for important ticket events such as ticket
creation, status changes, and notes.

Tech Stack

Frontend

React

Vite

JavaScript

React Router

Tailwind CSS

Axios

Lucide React

Backend

Node.js

Express.js

JavaScript

Mongoose

CORS

dotenv

Database

MongoDB Atlas

Project Structure

The repository is organized as two applications: a React frontend and a
Node.js/Express backend.

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
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   └── vite.config.js
│
├── .gitignore
├── LICENSE
└── README.md

The structure above reflects the current project structure shown in
the project workspace. Environment example files should also be
included before final submission as required by the assessment.

Prerequisites

Install the following before running the project:

Node.js 18+

npm

MongoDB Atlas account

Git

Environment Variables

Do not commit real credentials or secrets to GitHub.

Backend

Create:

backend/.env

Add:

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string

Frontend

Create:

frontend/.env

Add:

VITE_API_URL=http://localhost:5000

For the final GitHub submission, also include:

backend/.env.example
frontend/.env.example

These files should contain placeholder values only.

Example backend/.env.example:

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string

Example frontend/.env.example:

VITE_API_URL=http://localhost:5000

MongoDB Atlas Setup

The application uses MongoDB Atlas through Mongoose.

Create a MongoDB Atlas connection string and place it in:

backend/.env

Example:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/support_crm

The application uses ticket and note models for storing support data.

Installation

1. Clone the repository

git clone https://github.com/Omkar-XD/Customer-Support-Ticketing-CRM-System.git
cd Customer-Support-Ticketing-CRM-System

2. Install backend dependencies

cd backend
npm install

Configure backend/.env, then start the backend:

npm run dev

The backend runs on:

http://localhost:5000

3. Install frontend dependencies

Open another terminal:

cd frontend
npm install

Configure frontend/.env, then start the frontend:

npm run dev

Vite will provide the local frontend URL, normally:

http://localhost:5173

API Endpoints

The CRM backend exposes REST APIs for ticket management.

Create Ticket

POST /api/tickets

Request body:

{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Unable to login",
  "description": "Customer cannot access their account."
}

Get Tickets

GET /api/tickets

Filter Tickets

GET /api/tickets?status=Open

Supported statuses:

Open
In Progress
Closed

Search Tickets

GET /api/tickets?search=john

Search can be used for customer and ticket information supported by the
CRM.

Get Ticket Details

GET /api/tickets/:ticket_id

Example:

GET /api/tickets/TKT-001

Update Ticket

PUT /api/tickets/:ticket_id

Example request:

{
  "status": "In Progress",
  "notes": "Support team has started investigating the issue."
}

Application Workflow

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

Main Pages

Dashboard

Provides an overview of support operations, including ticket statistics,
recent activity, ticket status information, and the support ticket list.

All Tickets

Displays the available support tickets with search and status filtering.

Create Ticket

Allows support staff to create a new ticket using:

Customer name

Customer email

Issue subject

Issue description

Ticket Details

Displays detailed ticket information and provides controls for:

Viewing customer information

Viewing issue details

Updating ticket status

Adding notes

Viewing ticket activity

Bonus Feature: Ticket Activity Timeline

The additional feature implemented in the project is the Ticket Activity
Timeline.

It provides a chronological view of important actions performed on a
ticket.

Example:

Ticket Created
      ↓
Status Changed
      ↓
Note Added
      ↓
Status Changed
      ↓
Ticket Closed

This helps support staff understand the history of a ticket rather than
only seeing its current status.

Error Handling

The backend is designed to handle common API errors such as:

Invalid requests

Missing required ticket information

Ticket not found

Invalid ticket IDs

Database errors

Invalid status values

The frontend provides loading, empty, and error states where applicable.

Security

Sensitive environment variables should never be committed to the
repository.

The following should be ignored by Git:

node_modules/
.env
.env.local
.env.production
dist/

Only placeholder environment variables should be included in
.env.example files.

Deployment

The application can be deployed using:

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas

Production environment variables should be configured through the
respective deployment platform.

Live Demo

Frontend:

To be added after deployment

Backend:

To be added after deployment

Future Improvements

Possible future improvements include:

Authentication and role-based access

Support agent assignment

Customer profiles

Email notifications

File attachments

Pagination for larger datasets

Advanced analytics

Real-time ticket updates

More detailed audit logging

These improvements are intentionally outside the current MVP scope so
that the core ticketing workflow remains simple and focused.

Repository

GitHub:

https://github.com/Omkar-XD/Customer-Support-Ticketing-CRM-System

Author

Omkar Chavan

GitHub:

https://github.com/Omkar-XD

License

This project was developed as part of a technical assessment.
