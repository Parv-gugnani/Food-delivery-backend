const express = require("express");
const {
  addOrder,
  viewOrders,
  viewOrderById,
} = require("../controller/orderController");

const router = express.Router();

router.post("/add", addOrder);
router.get("/view", viewOrders);
router.get("/:id", viewOrderById);

module.exports = router;
