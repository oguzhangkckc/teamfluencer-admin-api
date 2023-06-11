const User = require('../models/user');
const Verification = require('../models/verification');

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

        const { birthday, name, insta, tiktok, profile_complete, email, phone, money, job, country, city, gender } = user;
        const userData = {
            birthday,
            name,
            email,
            phone,
            instagram: insta,
            profile_complete,
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

exports.getverificationprofiles = async (req, res) => {
    const query = { status: false, denied_verification: false };
    const count = 200;

    try {
        const profiles = await Verification.find(query)
            .populate('user')
            .sort({ application_date: 1 })
            .limit(count)
            .exec();

        const verificationProfiles = profiles.map((profile) => {
            return {
                birthday: profile.user.birthday,
                name: profile.user.name,
                email: profile.user.email,
                phone: profile.user.phone,
                profile_complete: profile.user.profile_complete,
                country: profile.user.country,
                city: profile.user.city,
                gender: profile.user.gender,
            };
        });
        console.log(verificationProfiles.length);
        res.status(200).json(verificationProfiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


