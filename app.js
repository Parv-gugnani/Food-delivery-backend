const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRouters");
const adminUsersRoutes = require("./routes/adminRouters");
const itemRouters = require("./routes/itemRouters");
const orderRouters = require("./routes/orderRouters");
// const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// connectDB();

dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/foodp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use("/api/users", userRoutes);

app.use("/api/admin", adminUsersRoutes);

app.use("/api/item", itemRouters);

app.use("/api/order", orderRouters);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
