const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.register = async function (
  email,
  password,
  confirmPassword
) {
  if (email === "") {
    throw Error("Email is required!");
  }

  if (password === "") {
    throw Error("Password is required!");
  }

  if (confirmPassword === "") {
    throw Error("Confirm password is required!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email address!");
  }

  if (password.length < 6) {
    throw Error("The password must be at least 6 characters");
  }

  if (password !== confirmPassword) {
    throw Error("Passwords do not match!");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    console.log("email already exists");
    throw Error("This email is already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill all the fields!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email address!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email or password is wrong!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Email or password is wrong!");
  }
  console.log("user logged in");
  return user;
};

userSchema.statics.resetPassword = async function (
  email,
  password,
  confirmPassword
) {
  if (email === "") {
    throw Error("Email is required!");
  }

  if (password === "") {
    throw Error("Password is required!");
  }

  if (confirmPassword === "") {
    throw Error("Confirm password is required!");
  }

  if (password !== confirmPassword) {
    throw Error("Passwords do not match!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email address!");
  }
  if (password.length < 6) {
    console.log("password too short");
    throw Error("The password must be at least 6 characters");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("There is no such email!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const resetPassword = await this.findOneAndUpdate(
    { email },
    { password: hash }
  );
  console.log("password changed");
  return resetPassword;
};

module.exports = mongoose.model("User", userSchema);
