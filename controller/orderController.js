const Order = require("../models/order");
const Cart = require("../models/cart");
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
    useCart,
  } = req.body;

  if (useCart) {
    const cart = await Cart.findOne({ user }).populate("items.item");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = new Order({
      user,
      orderLocation,
      items: cart.items.map((cartItem) => ({
        item: cartItem.item._id,
        quantity: cartItem.quantity,
      })),
      payment,
      deliveryTime,
      orderStatus: "pending",
      totalPrice: cart.totalPrice,
    });

    const savedOrder = await newOrder.save();

    await Cart.findOneAndDelete({ user });

    return res.status(201).json(savedOrder);
  }

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
