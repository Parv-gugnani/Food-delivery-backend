const expressAsyncHandler = require("express-async-handler");
const Cart = require("../models/cart");

const addToCart = asyncHandler(async (req, res) => {
  const { userId, Items } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [], totalPrice: 0 });
  }

  cart.items.push(...items);

  let totalPrice = 0;

  cart.totalPrice = totalPrice;

  await cart.save();
  res.status(201).json(cart);
});
