const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AdminUser = require("../models/admin");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.authorizations.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user =
        (await AdminUser.findById(decoded.id).select("-password")) ||
        (await User.findById(decoded.id).select("password"));
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const adminProtect = (req, res, next) => {
  if (req.user && req.user.restaurantName) {
    next();
  } else {
    res.status(403);
    throw new Error("Admin acess required");
  }
};

module.exports = { protect, adminProtect };
