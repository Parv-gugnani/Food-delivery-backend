const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    ownerAddress: {
      type: String,
      required: true,
    },
    ownerPhoneNumber: {
      type: String,
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantAddress: {
      type: String,
      required: true,
    },
    restaurantPhoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
