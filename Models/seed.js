const mongoose = require("mongoose");
const Menu = require("./menu");

const menuItems = [
  {
    name: "Cheese Burger",
    price: 8.99,
    description: "Delicious cheese burger with fresh ingredients.",
    category: "Burgers",
  },
  {
    name: "Veggie Pizza",
    price: 10.99,
    description: "Tasty veggie pizza with fresh vegetables.",
    category: "Pizzas",
  },
  {
    name: "Caesar Salad",
    price: 7.99,
    description: "Fresh Caesar salad with croutons.",
    category: "Salads",
  },
  {
    name: "Spaghetti Carbonara",
    price: 12.99,
    description: "Classic spaghetti with creamy carbonara sauce.",
    category: "Pasta",
  },
  {
    name: "Margherita Pizza",
    price: 9.99,
    description: "Classic Margherita pizza with fresh basil.",
    category: "Pizzas",
  },
  {
    name: "BBQ Chicken Wings",
    price: 10.49,
    description: "Spicy BBQ chicken wings served with ranch.",
    category: "Appetizers",
  },
  {
    name: "Beef Tacos",
    price: 11.99,
    description: "Tasty beef tacos with all the fixings.",
    category: "Tacos",
  },
  {
    name: "Chocolate Cake",
    price: 5.99,
    description: "Rich and moist chocolate cake.",
    category: "Desserts",
  },
  {
    name: "Ice Cream Sundae",
    price: 4.99,
    description: "Classic sundae with ice cream and toppings.",
    category: "Desserts",
  },
  {
    name: "Fruit Smoothie",
    price: 3.99,
    description: "Refreshing fruit smoothie with seasonal fruits.",
    category: "Beverages",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/foodp");
    await Menu.deleteMany();
    await Menu.insertMany(menuItems);
    console.log("Menu items seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
