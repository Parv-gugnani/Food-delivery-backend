const express = require("express");
const { protect, adminProtect } = require("../middleware/auth");
const { viewMenu, addMenuItem } = require("../controller/menuController");

const router = express.Router();

router.post("/menu/add", protect, adminProtect, addMenuItem);

router.get("/menu/view/:restaurantId", protect, viewMenu);

module.exports = router;
