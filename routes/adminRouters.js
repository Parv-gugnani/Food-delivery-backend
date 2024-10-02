const express = require("express");
const {
  registerAdminUser,
  loginAdminUser,
} = require("../controller/adminController");

const router = express.Router();

router.post("/register-admin", registerAdminUser);

router.post("/login-admin", loginAdminUser);

module.exports = router;
