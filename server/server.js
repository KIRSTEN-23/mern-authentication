const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


//Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI,)

.then(() => {
  console.log("MongoDB Connected");

}).catch (err => {
  console.log("MongoDB connection error:", error);
});

// ------------------------------------------------------------------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------------------------------------------------------------------

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);



// Test if it works
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});