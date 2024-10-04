const Menu = require("../models/menu");

const viewMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu" });
  }
};

module.exports = {
  viewMenu,
};
