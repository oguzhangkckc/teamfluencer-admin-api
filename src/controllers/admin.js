const { default: mongoose } = require('mongoose');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

///////////////////////// LOGIN /////////////////////////////

exports.signIn = async (req, res) => {
  console.log('loginAdmin');
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    res.status(200).json({ email, token });
    console.log( email +' (admin) logged in');
  } catch (error) {
    console.log('error.message :' + error.message);
    res.status(400).json({ error: error.message });
  }
};

///////////////////////// REGISTER /////////////////////////////

exports.signUp = async (req, res) => {
  const { email, password} = req.body;
  console.log(email, password);
  try {
    const admin = await Admin.register(email, password);

    const token = createToken(admin._id);
    console.log("data", email, password, );
    res.status(201).json({ email, token });
    console.log(email +' (admin) created');
  } catch (error) {
    console.log('error.message :' + error.message);
    res.status(400).json({ error: error.message });
  }
};
