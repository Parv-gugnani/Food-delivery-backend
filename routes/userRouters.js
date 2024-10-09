const express = require("express");
const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile", updateProfile);

module.exports = router;
