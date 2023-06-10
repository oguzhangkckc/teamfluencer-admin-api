const express = require('express');
const { signIn, signUp } = require('../controllers/admin');
const adminRouter = express.Router();

adminRouter.post('/signUp', signUp);
adminRouter.post('/signIn', signIn);

module.exports = adminRouter;
