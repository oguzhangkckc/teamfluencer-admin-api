const User = require('../models/user');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({$or:[{phone: req.body.phone}, {email: req.body.email}]});
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };