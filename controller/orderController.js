const Order = require("../models/order");
const asyncHandler = require("express-async-handler");

const addOrder = asyncHandler(async (req, res) => {
  const {
    user,
    orderLocation,
    items,
    payment,
    deliveryTime,
    orderStatus,
    totalPrice,
  } = req.body;

  if (
    !user ||
    !orderLocation ||
    !items ||
    !payment ||
    !deliveryTime ||
    !orderStatus ||
    !totalPrice
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newOrder = new Order({
    user,
    orderLocation,
    items,
    payment,
    deliveryTime,
    orderStatus,
    totalPrice,
  });

  const savedOrder = await newOrder.save();
  res.status(201).json(savedOrder);
});

const viewOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user items");
  res.status(200).json(orders);
});

const viewOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user items");
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json(order);
});

module.exports = { addOrder, viewOrders, viewOrderById };
