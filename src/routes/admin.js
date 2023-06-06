const express = require('express');
const { signIn, signUp } = require('../controllers/admin');
const userRouter = express.Router();

userRouter.post('/signUp', signUp);
userRouter.post('/signIn', signIn);

module.exports = userRouter;
