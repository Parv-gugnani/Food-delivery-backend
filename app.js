const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./router/userRoute");

//routes

//connect to db
mongoose
  .connect("mongodb://localhost:27017/foodp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, address, phoneNumber, email, password } =
      req.body;

    // if anything miss outs
    if (
      !(email && password && firstName && lastName && address && phoneNumber)
    ) {
      res.status(400).send("All input is required");
    }

    // old user
    const oldUser = await user.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already exist");
    }

    encryptpass = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone_number: phoneNumber,
      email: email.toLowerCase(),
      password: encryptpass,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expressIn: "5h",
      }
    );

    user.token = token;

    res.status(201).json(user);

    //
  } catch (error) {
    // throw.error
  }
});

// app.post("/login", (req, res) => {
//   // try
// });

app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:4001/`)
);
