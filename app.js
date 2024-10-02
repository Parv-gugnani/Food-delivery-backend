import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/user.js";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/foodp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.get("/user-register", (req, res) => {
  res.send("Hey Welcome to Food Delivery App login here");
});

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
