const mongoose = require("mongoose");

const AdminUserSchema = mongoose.Schema(
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
    userRole: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const adminUser = mongoose.model("AdminUser", AdminUserSchema);

module.exports = adminUser;
