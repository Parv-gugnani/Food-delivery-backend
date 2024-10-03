const express = require("express");
const {
  registerAdminUser,
  loginAdminUser,
} = require("../controller/adminController");

const router = express.Router();

router.post("/aregister", registerAdminUser);

router.post("/alogin", loginAdminUser);

module.exports = router;
