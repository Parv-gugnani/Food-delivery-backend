const express = require("express");
const { default: mongoose } = require("mongoose");

const OrderSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderLocation: {
    type: String,
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
});
