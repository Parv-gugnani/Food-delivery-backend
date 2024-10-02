const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./router/userRoute");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/foodp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.get("/test", (req, res) => {
  res.send("Server is working!");
});

app.post("/register", async (req, res) => {
  console.log(req.body); // Add this line in /register

  try {
    const { firstName, lastName, address, phoneNumber, email, password } =
      req.body;

    if (
      !(email && password && firstName && lastName && address && phoneNumber)
    ) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already exists");
    }

    const encryptpass = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      address,
      phone_number: phoneNumber,
      email: email.toLowerCase(),
      password: encryptpass,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
