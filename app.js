const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./router/userRoute");

//routes

//connect to db
mongoose
  .connect("mongodb://localhost:27017/foodp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:3000/`)
);
