const express = require("express");
const { default: mongoose } = require("mongoose");

const OrderSchema = mongoose.Schema({
  orderLocation: {
    type: String,
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  payment: {
    type: Boolean,
    required: true,
  },
  deliveryTime: {
    type: String,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "In Progress", "Delivered"],
    default: "Pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
