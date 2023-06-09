const Admin = require('../models/admin');
const uuid = require('uuid');
const session = {};

///////////////////////// LOGIN /////////////////////////////

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    const sessionId = uuid.v4();
    session[sessionId] = { email, userId: admin._id, role: admin.role };
    res.set({ 'Access-Control-Expose-Headers': 'Set-Cookie' });
    res.status(201).json({ session });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

///////////////////////// REGISTER /////////////////////////////

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const admin = await Admin.register(email, password);
    const sessionId = uuid.v4();
    session[sessionId] = { email, userId: admin._id, role: admin.role };
    res.set({ 'Access-Control-Expose-Headers': 'Set-Cookie' });
    res.status(201).json({ session });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
