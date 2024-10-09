const express = require("express");
const {
  registerAdminUser,
  loginAdminUser,
} = require("../controller/adminController");

const router = express.Router();

router.post("/register", registerAdminUser);

router.post("/login", loginAdminUser);

module.exports = router;
