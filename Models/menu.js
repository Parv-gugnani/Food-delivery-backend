const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
  restuarantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminUser",
    required: true,
  },
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      isAvailable: {
        type: Boolean,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ],
});

const menu = mongoose.model("Menu", MenuSchema);

module.exports = menu;
