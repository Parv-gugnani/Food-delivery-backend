const Menu = require("../models/menu");

const addMenuItem = async (req, res) => {
  const { restaurantId, name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const newItem = new Menu({
    name,
    price,
    description,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding menu item" });
  }
};

const viewMenu = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const menuItems = await Menu.find({ restaurantId });
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu" });
  }
};

module.exports = {
  addMenuItem,
  viewMenu,
};
