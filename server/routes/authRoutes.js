const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ------------------------------------------------------------------------------------------------------------------------------
// REGISTER
// ------------------------------------------------------------------------------------------------------------------------------
router.post("/register", async (req, res) => {

  try {

    const{
      username,
      email,
      password,
      butlerAccessCode,
    } = req.body;
  
    if (!email || !password || !butlerAccessCode) {

      return res.status(400).json({
        error: "Please fill in all required fields.",
      });

    }

     if (password.length < 6) {

      return res.status(400).json({
        error: "Password must be at least 6 characters long.",
      });
    }

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {

      return res.status(400).json({
        error: "Email already in use.",
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const structuredAccessCode = JSON.stringify(butlerAccessCode);
    const hashedAccessCode = await bcrypt.hash(structuredAccessCode, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      butlerAccessCode: hashedAccessCode,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
});


// ------------------------------------------------------------------------------------------------------------------------------
// LOGIN
// ------------------------------------------------------------------------------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const {
      loginIdentifier,
      password,
      butlerAccessCode,
    } = req.body;

    if (!loginIdentifier || !password || !butlerAccessCode) {
      return res.status(400).json({
        message: "Please provide username or email, password and suite setup.",
      });
    }

    const user = await User.findOne({ $or: [{ email: loginIdentifier }, { username: loginIdentifier }] });

    if (!user) {
      return res.status(400).json({
        message: "Invalid login details.",
      });
    }

    if (!user.password || !user.butlerAccessCode) {
  return res.status(400).json({
    message: "User account is missing authentication fields. Please register again.",
  });
}


    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(400).json({
        message: "Invalid login details.",
      });
    }

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
    res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
});

module.exports = router;