const express = require("express");
const { protect, adminProtect } = require("../middleware/auth");
const { viewMenu, addMenuItem } = require("../controller/menuController");

const router = express.Router();

router.get("/menu/view", viewMenu);

module.exports = router;
