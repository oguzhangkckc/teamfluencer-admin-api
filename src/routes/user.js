const express = require('express');
const router = express.Router();
const { getuser, getverificationprofiles } = require('../controllers/user');

router.get('/getuser', getuser);
router.get('/getverificationprofiles', getverificationprofiles)

module.exports = router;
