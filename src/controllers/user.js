const User = require('../models/user');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ $or: [{ phone: req.body.phone }, { email: req.body.email }] });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { birthday, name, email, phone, insta, tiktok, money, job, country, city, gender } = user;
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
            gender
        };

        res.status(201).json(userData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

    // doğumgünü, isim, email, telefon, instagram, tiktok, money, job, country/city, gender