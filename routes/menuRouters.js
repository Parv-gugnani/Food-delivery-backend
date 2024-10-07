const express = require("express");
const { isAdmin, isUser } = require("../middleware/auth");
const { viewMenu, addMenuItem } = require("../controller/menuController");

const router = express.Router();

//get
router.get("/view", viewMenu, isUser);

//post
router.post("/add", addMenuItem, isAdmin);

module.exports = router;
