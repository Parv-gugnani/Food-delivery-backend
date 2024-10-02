const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRouters");

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON payloads
app.use(cors()); // Enable CORS

dotenv.config();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/foodp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// User routes
app.use("/api/users", userRoutes); // Notice it's /users here

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
