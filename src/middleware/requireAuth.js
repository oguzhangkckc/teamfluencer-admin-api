const cookieSession = require('cookie-session');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],
    maxAge: 24 * 60 * 60 * 1000,
  }),
);

function requireLogin(req, res, next) {
  if (!req.session) {
    res.status(401).json({ error: 'Unauthorized. Please login.' });
  } else if (!req.session.userId) {
    res.status(401).json({ error: 'Unauthorized. Please login.' });
  } else {
    next();
  }
}

module.exports = requireLogin;
