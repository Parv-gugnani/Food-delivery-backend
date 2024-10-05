const express = require("express");
const {
  addOrder,
  viewOrder,
  viewOrderById,
} = require("../controller/orderController");

const router = express.Router();

router.post("/add", addOrder);
router.get("/view", viewOrder);
router.get("/:id", viewOrderById);

module.exports = router;
