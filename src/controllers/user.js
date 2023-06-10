const User = require('../models/user');

exports.getuser = async (req, res) => {
    try {
        const { _email, _phone } = req.query;

        if (!_email && !_phone) {
            return res.status(400).json({ error: 'You should provide at least one parameter: email, phone.' });
        }

        const searchParameters = [];

        if (_email) {
            searchParameters.push({ email: _email });
        }

        if (_phone) {
            console.log("deneme")
            searchParameters.push({ phone: `+${_phone}` });
        }

        const user = await User.findOne({ $or: searchParameters });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { birthday, name, insta, tiktok, email, phone, money, job, country, city, gender } = user;
        const userData = {
            birthday,
            name,
            email,
            phone,
            instagram: insta,
            tiktok,
            money,
            job,
            country,
            city,
            gender,
        };

        console.log(userData);

        res.status(200).json(userData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
