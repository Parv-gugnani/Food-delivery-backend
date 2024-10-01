const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    owner_address: {
      type: String,
      required: true,
    },
    owner_phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    resturant_name: {
      type: String,
      required: true,
    },
    resturant_phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    resturant_address: {
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
  { timestamps: true }
);

module.exports = mongoose.model("AdminUser", AdminUserSchema);
