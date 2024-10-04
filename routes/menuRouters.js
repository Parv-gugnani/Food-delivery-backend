const express = require("express");
// const { protect, adminProtect } = require("../middleware/auth");
const { viewMenu, addMenuItem } = require("../controller/menuController");

const router = express.Router();

//get
router.get("/view", viewMenu);

//post
router.post("/add", addMenuItem);

module.exports = router;
