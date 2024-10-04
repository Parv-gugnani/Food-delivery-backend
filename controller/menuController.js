const Menu = require("../models/menu");

const viewMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu" });
  }
};

const addMenuItem = async (req, res) => {
  const { name, price, description, category } = req.body;

  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const newItem = new Menu({
    name,
    price,
    description,
    category,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding menu item" });
  }
};

module.exports = { viewMenu, addMenuItem };
