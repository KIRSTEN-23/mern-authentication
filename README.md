# $\color{blue}{\text{Butler’s Access Code Authentication System}}$

## $\color{lightblue}{\text{Overview}}$

This is an individual MERN stack authentication project exploring alternative behavioural authentication methods through an immersive luxury hotel interaction system.

Instead of using a traditional password-based login system, this project introduces a creative authentication method called:

### “The Butler’s Access Code”

Users authenticate by recreating their personalised luxury hotel suite configuration.

The system combines:

* interaction-based authentication
* environmental personalisation
* behavioural sequencing
* JWT authentication
* hashed credential storage using bcrypt

This transforms login from a traditional technical interaction into a luxury, immersive experience.

---

## Project Concept

Traditional authentication systems rely heavily on:

* passwords
* PINs
* OTPs
* biometrics

This project explores an alternative interaction model where authentication becomes:

* memorable
* atmospheric
* personalised
* behaviour-driven

Users create a custom luxury suite setup during registration.

Examples include:

* lighting preference
* music preference
* drink preference
* fireplace state
* pillow count
* interaction order

During login, the user must recreate the same setup.

The backend validates:

* selected preferences
* interaction sequence
* structured access pattern

If matched successfully:

* a JWT token is issued
* the user gains access to the dashboard

---

## Features

#### Authentication Features

* Custom behavioural authentication
* JWT-based session authentication
* bcrypt hashing
* Hashed Butler Access Code storage
* Secure login verification
* Login state persistence using localStorage

#### UI Features

* React Bootstrap UI
* Tab-based Login/Register switching
* Luxury-themed authentication concept
* Pillows interaction counter
* Dynamic interaction order tracking
* Dashboard access control

#### Technical Features

* MongoDB Atlas integration
* Express API
* Mongoose schema modelling
* REST API routes
* Axios frontend requests
* Environment variable configuration

---

## Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,bootstrap,vscode,github" />
</p>

#### Frontend

* React
* React Bootstrap
* Axios
* Bootstrap

#### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* bcrypt
* JWT (jsonwebtoken)
* dotenv
* cors

---

## Project Structure

```mern-ecommerce-luxuryAccommodation/
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

## Installation

#### Clone Repository

git clone <repository-url>

---

## Backend Setup

1. Navigate to server

```cd server
```

2. Install dependencies

npm install express mongoose cors dotenv bcrypt jsonwebtoken nodemon

3. Create .env

MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=theButlerKnowsYourJazzPlaylist

4. Run backend

node server.js

OR

npm run dev

Expected output:

MongoDB Connected
Server running at http://localhost:5000

---

## Frontend Setup

1. Navigate to client

cd client

2. Install dependencies

npm install axios react-bootstrap bootstrap

3. Run frontend

npm run dev

Expected output:

http://localhost:5173

---
## MongoDB Atlas Setup

Steps

1. Create MongoDB Atlas account
2. Create cluster
3. Create database user
4. Add IP address to Network Access
5. Copy connection string
6. Add connection string to .env

---

## Authentication Flow

<p align="center">
  <img src="./assets/UML.png" width="100%" />
</p>

#### Registration Flow

User opens Register tab → User creates suite setup → Suite configuration converted into structured data → Backend hashes Butler Access Code
→ User stored in MongoDB

#### Login Flow

User opens Login tab → User enters username → User recreates suite setup → Backend compares hashed Butler Access Code
→ JWT token issued → Dashboard access granted

---

## Butler’s Access Code

The Butler’s Access Code consists of:

* Lighting selection
* Drink selection
* Music selection
* Fireplace state
* Pillow count
* Interaction order

Example:

```{
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

This object is converted into structured JSON and securely hashed before storage.

---

## Security

#### bcrypt Hashing

The project uses bcrypt to:

* generate salts
* hash Butler Access Codes
* compare login attempts securely

This ensures:

* original authentication data is never stored directly
* hashes cannot easily be reversed
* authentication data is protected during database breaches

---

## JWT Authentication

JWT tokens are used for:

* login sessions
* dashboard access
* client-side authentication state

Tokens are stored in:

localStorage

---

## API Endpoints

#### Register

POST /api/auth/register

```Example Body

{
  "username": "kirsten",
  "email": "kirsten@test.com",
  "butlerAccessCode": {
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
}
```

#### Login

POST /api/auth/login

Example Body

```{
  "username": "kirsten",
  "butlerAccessCode": {
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
}
```

---

## UI Components

#### Register

Allows users to:

* create account
* personalise suite setup
* generate Butler Access Code

#### Login

Allows users to:

* enter username
* recreate suite setup
* authenticate via behavioural interaction

#### Dashboard

Protected screen shown after successful authentication.

Allows users to:

* view login state
* access authenticated content
* logout

---

## Future Improvements

Potential future enhancements include:

* drag-and-drop suite interactions
* timed interaction authentication
* dynamic room themes
* sound effects and ambience
* behavioural timing validation
* interaction gesture validation
* refresh token authentication
* encrypted local storage
* role-based authentication
* multi-factor authentication
* accommodation CRUD integration

---

## Learning Outcomes

This project demonstrates:

#### Frontend Skills

* React state management
* component architecture
* conditional rendering
* Axios API requests
* Bootstrap UI integration

#### Backend Skills

* Express routes
* REST API development
* middleware usage
* JWT authentication
* bcrypt hashing
* request handling

#### Database Skills

* MongoDB Atlas integration
* Mongoose schemas
* model creation
* secure credential storage

#### Security Concepts

* hashing
* salting
* JWT authentication
* secure credential handling
* behavioural authentication concepts

---

## Author

Butler’s Access Code Authentication System

Built using the MERN Stack.

This project serves as a standalone authentication experiment and conceptual foundation for future integration into the Deluxe Bookings ecosystem.