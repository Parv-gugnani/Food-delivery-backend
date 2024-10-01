const express = require("express");
const mongoose = require("mongoose");
const app = express();

//routes

//connect to db
mongoose
  .connect("mongodb://localhost:27017/foodp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:3000/`)
);
