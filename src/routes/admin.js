const express = require('express');
const { signin, signup } = require('../controllers/admin');
const adminRouter = express.Router();
const requireAuth = require('../middleware/requireAuth');

adminRouter.post('/signup', signup);
adminRouter.post('/signin', signin);

adminRouter.use(requireAuth);

adminRouter.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

module.exports = adminRouter;
