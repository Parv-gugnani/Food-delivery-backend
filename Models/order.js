const mongoose = require("mongoose");

const genOwn = () => {
  return Math.floor(100 + Math.random() * 900);
};

const orderSchema = new mongoose.Schema(
  {
    customId: { type: Number, default: genOwn, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderLocation: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    payment: { type: String, required: true },
    deliveryTime: { type: Date, required: true },
    orderStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
