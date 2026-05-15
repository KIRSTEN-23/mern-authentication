const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({

  propertyName: {
    type: String,
    required: true,
  },

  propertyType: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  guestCapacity: {
    type: Number,
    required: true,
  },

  bedrooms: {
    type: Number,
    required: true,
  },

  bathrooms: {
    type: Number,
    required: true,
  },

  hostName: {
    type: String,
    required: true,
  },

  hostEmail: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    default: "published",
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model("Listing", ListingSchema);