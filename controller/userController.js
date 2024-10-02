const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "30d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, phoneNumber, email, password } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !address ||
    !phoneNumber ||
    !email ||
    !password
  ) {
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
    address,
    phoneNumber,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
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
    throw new Error("Invalid User");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("JWT_SECRET:", process.env.JWT_SECRET);
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

module.exports = {
  registerUser,
  loginUser,
};

/*

{
    "message": "secretOrPrivateKey must have a value",
    "stack": "Error: secretOrPrivateKey must have a value\n    
    at module.exports [as sign] (D:\\Node js Projects\\food-delivery-app\\node_modules\\jsonwebtoken\\sign.js:111:20)\n    
    at generateToken (D:\\Node js Projects\\food-delivery-app\\controller\\userController.js:7:14)\n    
    at D:\\Node js Projects\\food-delivery-app\\controller\\userController.js:80:14"
}
*/
