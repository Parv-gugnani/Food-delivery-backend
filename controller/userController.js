const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const updates = {};

  Object.keys(req.body).forEach((key) => {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
};
