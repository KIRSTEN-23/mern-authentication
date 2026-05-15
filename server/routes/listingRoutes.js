const express = require("express");

const router = express.Router();

const Listing = require("../models/Listing");


// CREATE LISTING
router.post("/", async (req, res) => {

  try {

    const listing = new Listing(req.body);

    await listing.save();

    res.status(201).json(listing);

  } catch (err) {

    res.status(400).json({
      error: err.message,
    });

  }

});


// GET ALL LISTINGS
router.get("/", async (req, res) => {

  try {

    const listings = await Listing.find();

    res.status(200).json(listings);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});


// GET SINGLE LISTING
router.get("/:id", async (req, res) => {

  try {

    const listing = await Listing.findById(req.params.id);

    if (!listing) {

      return res.status(404).json({
        message: "Listing not found",
      });

    }

    res.status(200).json(listing);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});


// UPDATE LISTING
router.put("/:id", async (req, res) => {

  try {

    const updatedListing = await Listing.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true,
      }

    );

    if (!updatedListing) {

      return res.status(404).json({
        message: "Listing not found",
      });

    }

    res.status(200).json(updatedListing);

  } catch (err) {

    res.status(400).json({
      error: err.message,
    });

  }

});


// DELETE LISTING
router.delete("/:id", async (req, res) => {

  try {

    const deletedListing = await Listing.findByIdAndDelete(req.params.id);

    if (!deletedListing) {

      return res.status(404).json({
        message: "Listing not found",
      });

    }

    res.status(200).json({
      message: "Listing deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }

});


module.exports = router;