
// =================================================================================================
// ABOUT FILE: authRoutes.js
// =================================================================================================

// WHAT:
// This file contains all authentication routes for the Butler Access Code system.

// The routes are:
// 1. Register
// 2. Login

// HOW:
// Express Router handles incoming frontend requests.
// bcrypt hashes passwords and Butler Access Codes.
// JWT creates secure login tokens.

// WHY:
// Authentication logic is separated from server.js to keep the backend modular,
// organised, and easier to maintain.

// server.js is like the hotel reception desk,
// and authRoutes.js is the authentication/security department.


// -------------------------------------------------------------------------------------------------
// FULL SYSTEM FLOW
// -------------------------------------------------------------------------------------------------

// FRONTEND (React)

// Axios sends request

// Then:

// BACKEND (Node.js + Express + MongoDB)

/*
authRoutes.js receives request → Validation checks user input → MongoDB queried through User model 
→ bcrypt compares hashes → JWT token generated → Response sent back to frontend */


// -------------------------------------------------------------------------------------------------
// SECURITY FLOW
// -------------------------------------------------------------------------------------------------

// Registration:

// User Password → bcrypt hashing → hashed password stored in MongoDB → Butler Access Code Object 
// → JSON.stringify() → bcrypt hashing → hashed Butler Access Code stored in MongoDB


// Login:

// User enters credentials → → bcrypt compares password with hashed password in MongoDB 

// If matched:
// JWT token generated


// =================================================================================================







// =================================================================================================
// IMPORT DEPENDENCIES
// =================================================================================================

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// WHAT:
// Import libraries and models needed by authentication system.

// HOW:
// require() loads external packages and local files.

// WHY:
// Each package provides a specific backend capability.





// =================================================================================================
// CREATE EXPRESS ROUTER
// =================================================================================================

const router = express.Router();  

// WHAT:
// Create isolated route controller.

// HOW:
// express.Router() creates mini route system.

// WHY:
// Keeps authentication routes separate from main server file.




// =================================================================================================
// REGISTER ROUTE
// =================================================================================================

router.post("/register", async (req, res) => {

// INPUT:
// username (optional)
// email
// password
// butlerAccessCode

// PROCESS:
// 1. Validate input
// 2. Check for duplicate account
// 3. Hash password
// 4. Hash Butler Access Code
// 5. Save user to MongoDB

// OUTPUT:
// Success or error response

// -------------------------------------------------------------------------------------------------
// ANALOGY
// -------------------------------------------------------------------------------------------------

// Like checking into a luxury hotel:

// email/password = identity verification

// Butler Access Code = personalised suite setup signature

// The system stores secure encrypted versions,
// NOT the originals.


  // -------------------------------------------------------------------------------------------------
  // STEP 1: EXTRACT REQUEST DATA
  // -------------------------------------------------------------------------------------------------

  try {

    // WHAT:
    // Pull user data from request body.

    // HOW:
    // Object destructuring extracts properties.

    // WHY:
    // Makes code cleaner and easier to read.

    const{
      username,
      email,
      password,
      butlerAccessCode,
    } = req.body;



  // -------------------------------------------------------------------------------------------------
  // STEP 2: VALIDATION
  // -------------------------------------------------------------------------------------------------
  
    if (!email || !password || !butlerAccessCode) {

      return res.status(400).json({
        error: "Please fill in all required fields.",
      });

    }

    // WHAT:
    // Ensure required fields are filled.

    // WHY:
    // Prevent incomplete accounts.


  // -------------------------------------------------------------------------------------------------
  // STEP 3: PASSWORD LENGTH VALIDATION
  // -------------------------------------------------------------------------------------------------

     if (password.length < 6) {

      return res.status(400).json({
        error: "Password must be at least 6 characters long.",
      });
    }

    // WHAT:
    // Prevent weak passwords.

    // WHY:
    // Improves account security.


  // -------------------------------------------------------------------------------------------------
  // STEP 4: CHECK IF USER ALREADY EXISTS
  // -------------------------------------------------------------------------------------------------

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {

      return res.status(400).json({
        error: "Email already in use.",
      });

    }

    // WHAT:
    // Prevent duplicate accounts.

    // HOW:
    // MongoDB $or checks email OR username.

    // WHY:
    // Ensures unique identities.

  // -------------------------------------------------------------------------------------------------
  // STEP 5: HASH PASSWORD
  // -------------------------------------------------------------------------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    // INPUT:
    // Plain text password

    // PROCESS:
    // bcrypt generates secure irreversible hash

    // OUTPUT:
    // Encrypted password string

    // WHY:
    // Passwords should NEVER be stored as plain text.

  // -------------------------------------------------------------------------------------------------
  // STEP 6: HASH BUTLER ACCESS CODE
  // -------------------------------------------------------------------------------------------------

    const structuredAccessCode = JSON.stringify(butlerAccessCode);
    const hashedAccessCode = await bcrypt.hash(structuredAccessCode, 10);

    // WHAT:
    // Convert Butler Access Code object into encrypted string.

    // HOW:
    // JSON.stringify()
    // converts object into text

    // bcrypt.hash()
    // encrypts the text

    // WHY:
    // MongoDB should not store raw authentication behaviour.

  // -------------------------------------------------------------------------------------------------
  // STEP 7: CREATE USER OBJECT
  // -------------------------------------------------------------------------------------------------

    const newUser = new User({
      // create MongoDB user document with hashed credentials
      username,
      email,
      password: hashedPassword,
      butlerAccessCode: hashedAccessCode,
    });

  // -------------------------------------------------------------------------------------------------
  // STEP 8: SAVE USER
  // -------------------------------------------------------------------------------------------------

    await newUser.save(); // Store user in MongoDB Atlas.

  // -------------------------------------------------------------------------------------------------
  // STEP 9: SEND RESPONSE
  // -------------------------------------------------------------------------------------------------    
  
    // if we reach this point, registration was successful. Send success message back to frontend.

    res.status(201).json({
      message: "User registered successfully.",
    });

  } catch (err) {

    // Error handling: catch any unexpected issues and send error response.

    res.status(500).json({
      error: err.message,
    });
  }
});


// =================================================================================================
// LOGIN ROUTE
// =================================================================================================

// INPUT:
// loginIdentifier
// password
// butlerAccessCode

// PROCESS:
// 1. Validate input
// 2. Find matching user
// 3. Compare password hash
// 4. Compare Butler Access Code hash
// 5. Generate JWT token

// OUTPUT:
// Successful login + JWT token

// -------------------------------------------------------------------------------------------------
// IMPORTANT CONCEPT
// -------------------------------------------------------------------------------------------------

// loginIdentifier is NOT stored in MongoDB.

// It is only a temporary frontend input variable.

// It can contain:

// - username
// OR
// - email

// MongoDB still stores:

// username
// email
// password
// butlerAccessCode


router.post("/login", async (req, res) => { // Handle POST requests to /api/auth/login

  try {

  // -------------------------------------------------------------------------------------------------
  // STEP 1: EXTRACT REQUEST DATA
  // -------------------------------------------------------------------------------------------------

    const {
      loginIdentifier,
      password,
      butlerAccessCode,
      
    } = req.body;

  // -------------------------------------------------------------------------------------------------
  // STEP 2: VALIDATE INPUT
  // -------------------------------------------------------------------------------------------------

    if (!loginIdentifier || !password || !butlerAccessCode) {

      return res.status(400).json({

        message:
         "Please provide username or email, password and suite setup.",
      });
    }

  // -------------------------------------------------------------------------------------------------
  // STEP 3: FIND USER
  // -------------------------------------------------------------------------------------------------

    const user = await User.findOne({ 
      $or: [
        { email: loginIdentifier }, 
        { username: loginIdentifier }
      ] 
    
    });

    // WHAT:
    // Search MongoDB using either email OR username.

    // HOW:
    // MongoDB $or checks both fields.

    // WHY:
    // Allows flexible login.    

  // -------------------------------------------------------------------------------------------------
  // STEP 4: INVALID USER CHECK
  // -------------------------------------------------------------------------------------------------

    if (!user) {
      return res.status(400).json({
        message: "Invalid login details.",
      });
    }

  // -------------------------------------------------------------------------------------------------
  // STEP 5: CHECK REQUIRED AUTH FIELDS
  // -------------------------------------------------------------------------------------------------    

  if (!user.password || !user.butlerAccessCode) {
    return res.status(400).json({
      message: "User account is missing authentication fields. Please register again.",
    });
  }

  // -------------------------------------------------------------------------------------------------
  // STEP 6: VERIFY PASSWORD
  // ------------------------------------------------------------------------------------------------- 

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(400).json({
        message: "Invalid login details.",
      });
    }

    // INPUT:
    // User password

    // PROCESS:
    // bcrypt.compare()

    // OUTPUT: 
    // true or false

  // -------------------------------------------------------------------------------------------------
  // STEP 7: VERIFY BUTLER ACCESS CODE
  // -------------------------------------------------------------------------------------------------     
    
  const structuredAccessCode = JSON.stringify(butlerAccessCode);

    const accessCodeMatches = await bcrypt.compare(
      structuredAccessCode,
      user.butlerAccessCode
    );

    if (!accessCodeMatches) {
      return res.status(400).json({
        message: "Suite setup does not match.",
      });
    }

  // -------------------------------------------------------------------------------------------------
  // STEP 8: CREATE JWT TOKEN
  // ------------------------------------------------------------------------------------------------- 

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username || null,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // WHAT:
    // Create temporary secure login token.

    // WHY:
    // Allows authenticated sessions without storing passwords.

  // -------------------------------------------------------------------------------------------------
  // STEP 9: SEND RESPONSE
  // ------------------------------------------------------------------------------------------------- 

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {

    // Error handling: catch any unexpected issues and send error response.
    res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
});

module.exports = router;