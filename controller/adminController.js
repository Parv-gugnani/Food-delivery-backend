const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const AdminUser = require("../models/admin");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerAdminUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    ownerAddress,
    ownerPhoneNumber,
    restaurantName,
    restaurantAddress,
    restaurantPhoneNumber,
    email,
    password,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !ownerAddress ||
    !ownerPhoneNumber ||
    !restaurantName ||
    !restaurantAddress ||
    !restaurantPhoneNumber ||
    !email ||
    !password
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const adminUserExist = await AdminUser.findOne({ email });
  if (adminUserExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const adminUser = await AdminUser.create({
    firstName,
    lastName,
    ownerAddress,
    ownerPhoneNumber,
    restaurantName,
    restaurantAddress,
    restaurantPhoneNumber,
    email,
    password: hashedPassword,
  });

  if (adminUser) {
    res.status(201).json({
      _id: adminUser.id,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      ownerAddress: adminUser.ownerAddress,
      ownerPhoneNumber: adminUser.ownerPhoneNumber,
      restaurantName: adminUser.restaurantName,
      restaurantAddress: adminUser.restaurantAddress,
      restaurantPhoneNumber: adminUser.restaurantPhoneNumber,
      email: adminUser.email,
      token: generateToken(adminUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

const loginAdminUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // console.log("JWT_SECRET:", process.env.JWT_SECRET);
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const adminUser = await AdminUser.findOne({ email: req.body.email });

  if (adminUser && (await bcrypt.compare(password, adminUser.password))) {
    res.json({
      _id: adminUser.id,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      ownerAddress: adminUser.ownerAddress,
      ownerPhoneNumber: adminUser.ownerPhoneNumber,
      restaurantName: adminUser.restaurantName,
      restaurantAddress: adminUser.restaurantAddress,
      restaurantPhoneNumber: adminUser.restaurantPhoneNumber,
      email: adminUser.email,
      token: generateToken(adminUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

module.exports = {
  registerAdminUser,
  loginAdminUser,
};
