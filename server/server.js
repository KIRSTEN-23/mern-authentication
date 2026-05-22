
// =================================================================================================
// ABOUT FILE: server.js
// =================================================================================================

// WHAT:
// This is the main backend entry file for the authentication system.

// HOW:
// It creates an Express server, connects to MongoDB, enables middleware, and connects auth routes.

// WHY:
// Think of this file as the hotel reception desk.
// Every request enters here first, then gets directed to the correct department.

// FLOW:
// React frontend → Axios request → server.js → authRoutes.js → User.js → MongoDB Atlas

// =================================================================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// -------------------------------------------------------------------------------------------------
// STEP 1: Middleware
// -------------------------------------------------------------------------------------------------

app.use(cors());
app.use(express.json());

// WHAT:
// Middleware runs before routes.

// HOW:
// cors() allows frontend-backend communication.
// express.json() allows Express to read JSON request bodies.

// WHY:
// Without express.json(), req.body would be undefined.


// -------------------------------------------------------------------------------------------------
// STEP 2: Declare Routes
// -------------------------------------------------------------------------------------------------

app.use("/api/auth", authRoutes);

// WHAT:
// Connects authentication routes to the backend.

// HOW:
// Any request starting with /api/auth goes to authRoutes.js.

// WHY:
// Keeps the server file clean and moves auth logic into a separate route file.


// -------------------------------------------------------------------------------------------------
// STEP 3: Test Route
// -------------------------------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Butler Access Code Authentication API is running.");
});

// INPUT:
// GET request to http://localhost:5000/

// PROCESS:
// Express receives the request.

// OUTPUT:
// Sends a simple message back to browser/Thunder Client.


// -------------------------------------------------------------------------------------------------
// STEP 4: MongoDB Connection
// -------------------------------------------------------------------------------------------------

mongoose
  .connect(process.env.MONGO_URI,)
  
  .then(() => {
    console.log("MongoDB Connected");
})  

.catch (err => {
      
       console.log("MongoDB connection error:", err);
});

// WHAT:
// Connects backend to MongoDB Atlas.

// HOW:
// mongoose.connect() uses the MONGO_URI stored in .env.

// WHY:
// The server should only start after database connection is successful.



// -------------------------------------------------------------------------------------------------
// STEP 5: Start Express Server
// -------------------------------------------------------------------------------------------------

// WHAT:
// Starts backend server.

// HOW:
// app.listen() opens the server on the selected port.

// WHY:
// Allows frontend, Thunder Client, and browsers to communicate with backend.

app.listen(PORT, () => {

  console.log(`Server running at http://localhost:${PORT}`);

});