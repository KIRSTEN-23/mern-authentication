
// =================================================================================================
// ABOUT FILE: User Model
// =================================================================================================

// WHAT:
// This file defines what a user document looks like inside MongoDB.

// HOW:
// Mongoose creates a schema with loginIdentifier, password, and Butler Access Code fields.

// WHY:
// The backend registration route needs this structure so it knows what data to save.
// Think of this like a hotel guest form: MongoDB will only store the fields written on the form.

// Flow:
// Frontend Register.jsx sends user data → userRoutes.js processes it → User.js defines how it is stored.const mongoose = require("mongoose");

// =================================================================================================

const UserSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    butlerAccessCode: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);