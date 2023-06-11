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
            name: profile.user.name,
            gender: profile.user.gender,
            age: profile.user.age,
            email: profile.user.email,
            country: profile.user.country,
            phone: profile.user.phone,
            profile_complete: profile.user.profile_complete,
            followers: profile.user.insta.followers,
            post_number: profile.user.insta.post_number,
            average_like: profile.user.insta.average_like,
            tiktok_followers: profile.user.tiktok.followers,
            videos: profile.user.tiktok.videos.length,
            tiktok_average_like: profile.user.tiktok.tiktok_average_like,
            tiktok_engagement_rate: profile.user.tiktok.tiktok_engagement_rate,
        };
    });
    res.status(200).json(verificationProfiles);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};