const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AdminUser = require("../models/admin");
const User = require("../models/user");

const isAdmin = (req, res, next) => {
  if (req.user.userRole !== "admin") {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  next();
};

const isUser = (req, res, next) => {
  if (req.user.userRole !== "user") {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  next();
};

module.exports = { isAdmin, isUser };
