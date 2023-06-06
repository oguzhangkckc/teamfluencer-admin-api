const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const adminSchema = new Schema(
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
  { timestamps: true },
);

adminSchema.statics.register = async function (email, password) {
  if (email === '') {
    throw Error('Email is required!');
  }

  if (password === '') {
    throw Error('Password is required!');
  }

  if (!validator.isEmail(email)) {
    throw Error('Please enter a valid email address!');
  }

  if (password.length < 6) {
    throw Error('The password must be at least 6 characters');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    console.log('email already exists');
    throw Error('This email is already registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const admin = await this.create({ email, password: hash });

  return admin;
};

adminSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Please fill all the fields!');
  }

  if (!validator.isEmail(email)) {
    throw Error('Please enter a valid email address!');
  }

  const admin = await this.findOne({ email });

  if (!admin) {
    throw Error('Email or password is wrong!');
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    throw Error('Email or password is wrong!');
  }
  return admin;
};

adminSchema.statics.resetPassword = async function (email, password) {
  if (email === '') {
    throw Error('Email is required!');
  }

  if (password === '') {
    throw Error('Password is required!');
  }

  if (!validator.isEmail(email)) {
    throw Error('Please enter a valid email address!');
  }
  if (password.length < 6) {
    console.log('password too short');
    throw Error('The password must be at least 6 characters');
  }

  const admin = await this.findOne({ email });

  if (!admin) {
    throw Error('There is no such email!');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const resetPassword = await this.findOneAndUpdate({ email }, { password: hash });
  console.log('password changed');
  return resetPassword;
};

module.exports = mongoose.model('Admin', adminSchema);
