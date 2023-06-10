const User = require('../models/user');

exports.getuser = async (req, res) => {
    try {
        const { email, phone } = req.query;

        if (!email && !phone) {
            return res.status(400).json({ error: 'You should provide at least one parameter: email, phone.' });
        }

        const searchParameters = [];

        if (email) {
            searchParameters.push({ email });
        }

        if (phone) {
            searchParameters.push({ phone: `+${phone}` });
        }

        const user = await User.findOne({ $or: searchParameters });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { birthday, name, insta, tiktok, money, job, country, city, gender } = user;
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
