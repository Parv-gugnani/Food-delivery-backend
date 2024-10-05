const Order = require("../models/order");
const asyncHandler = require("express-async-handler");

const addOrder = asyncHandler(async (req, res) => {
  const {
    orderLocation,
    foodName,
    payment,
    deliveryTime,
    orderStatus,
    totalPrice,
  } = req.body;

  if (
    !orderLocation ||
    !foodName ||
    !payment ||
    !deliveryTime ||
    !orderStatus ||
    !totalPrice
  ) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const newOrder = new Order({
    orderLocation,
    foodName,
    payment,
    deliveryTime,
    orderStatus,
    totalPrice,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error adding Order" });
  }
});

//view Orders
const viewOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch {
    res.status(500).json({ message: "Error Fetching Orders" });
  }
});

//using id
const viewOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the order" });
  }
});

module.exports = { addOrder, viewOrder, viewOrderById };
