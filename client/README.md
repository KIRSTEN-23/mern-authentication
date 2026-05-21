# Butler’s Access Code Authentication System

## Overview

This is an individual MERN stack authentication project exploring alternative behavioural authentication methods through an immersive luxury hotel interaction system.

## Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,bootstrap,vscode,github" />
</p>

---

# UML Diagram

<p align="center">
  <img src="./assets/uml.png" width="100%" />
</p>

---

# Butler’s Access Code

Users authenticate by recreating a personalised luxury hotel suite setup instead of using a traditional password.

The authentication system combines:

- interaction-based authentication
- environmental personalisation
- behavioural sequencing
- JWT authentication
- bcrypt hashing

---

# Features

## Authentication Features

- Custom behavioural authentication
- JWT-based session authentication
- bcrypt hashing
- Hashed Butler Access Code storage
- Secure login verification
- Login state persistence using localStorage

## UI Features

- React Bootstrap UI
- Tab-based Login/Register switching
- Luxury-themed authentication concept
- Pillows interaction counter
- Dynamic interaction order tracking
- Dashboard access control

## Technical Features

- MongoDB Atlas integration
- Express API
- Mongoose schema modelling
- REST API routes
- Axios frontend requests
- Environment variable configuration

---

# Tech Stack

## Frontend

- React
- React Bootstrap
- Axios
- Bootstrap

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcrypt
- JWT (jsonwebtoken)
- dotenv
- cors

---

# Project Structure

```text
mern-ecommerce-luxuryAccommodation/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Authentication Flow

## Registration Flow

```text
User opens Register tab
↓
User creates suite setup
↓
Suite configuration converted into structured data
↓
Backend hashes Butler Access Code
↓
User stored in MongoDB
```

---

## Login Flow

```text
User opens Login tab
↓
User enters username
↓
User recreates suite setup
↓
Backend compares hashed Butler Access Code
↓
JWT token issued
↓
Dashboard access granted
```

---

# Butler’s Access Code Structure

```json
{
  "lighting": "warm",
  "drink": "tea",
  "music": "jazz",
  "fireplace": true,
  "pillows": 4,
  "interactionOrder": [
    "lighting",
    "music",
    "drink",
    "fireplace",
    "pillows"
  ]
}
```

---

# Security

## bcrypt Hashing

The project uses bcrypt to:

- generate salts
- hash Butler Access Codes
- compare login attempts securely

## JWT Authentication

JWT tokens are used for:

- login sessions
- dashboard access
- client-side authentication state

Tokens are stored in:

```text
localStorage
```

---

# Future Improvements

- drag-and-drop suite interactions
- timed interaction authentication
- dynamic room themes
- sound effects and ambience
- behavioural timing validation
- interaction gesture validation
- refresh token authentication
- encrypted local storage
- role-based authentication
- multi-factor authentication

---

# Learning Outcomes

## Frontend Skills

- React state management
- component architecture
- conditional rendering
- Axios API requests
- Bootstrap UI integration

## Backend Skills

- Express routes
- REST API development
- middleware usage
- JWT authentication
- bcrypt hashing
- request handling

## Database Skills

- MongoDB Atlas integration
- Mongoose schemas
- model creation
- secure credential storage

## Security Concepts

- hashing
- salting
- JWT authentication
- secure credential handling
- behavioural authentication concepts

---

# Author

Butler’s Access Code Authentication System

Built using the MERN Stack.

This project serves as a standalone authentication experiment and conceptual foundation for future integration into the Deluxe Bookings ecosystem.
