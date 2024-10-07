const express = require("express");
const { isAdmin, isUser } = require("../middleware/auth");
const { viewItem, addItem } = require("../controller/itemController");

const router = express.Router();

//get
router.get("/view", viewItem, isUser);

//post
router.post("/add", addItem, isAdmin);

module.exports = router;
