const mongoose = require("mongoose");

const genHandle = (name) => {
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${name.toLowerCase().replace(/\s+/g, "")}_${randomSuffix}`;
};

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    userHandle: {
      type: String,
      unique: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.userHandle) {
    this.userHandle = genHandle(this.firstName);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
