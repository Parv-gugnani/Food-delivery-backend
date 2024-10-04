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
  },
});
