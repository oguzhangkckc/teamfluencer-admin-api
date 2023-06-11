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
        // if (req.query.country) {
        //     if (req.query.country === "TR") {
        //         query.country = "TR";
        //     } else {
        //         query.country = "OTHERS";
        //     }
        // }
        // if (req.query.gender) {
        //     query.gender = req.query.gender;
        // }
        // if (req.query.age) {
        //     const { min, max } = req.query.age;
        //     query.age = { $gte: parseInt(min), $lte: parseInt(max) };
        // }
        // if (req.query.followers) {
        //     const { min, max } = req.query.followers;
        //     query.followers = { $gte: parseInt(min), $lte: parseInt(max) };
        // }            
        // if (req.query.tiktok_followers) {
        //     const { min, max } = req.query.tiktok_followers;
        //     query.tiktok_followers = { $gte: parseInt(min), $lte: parseInt(max) };
        // }
        // if (req.query.post_number) {
        //     const { min, max } = req.query.post_number;
        //     query.post_number = { $gte: parseInt(min), $lte: parseInt(max) };
        // }
        // if (req.query.videos) {
        //     const { min, max } = req.query.videos;
        //     query.videos = { $gte: parseInt(min), $lte: parseInt(max) };
        // }
        // if (req.query.average_likes) {
        //     const { min, max } = req.query.average_likes;
        //     query.average_likes = { $gte: parseInt(min), $lte: parseInt(max) };
        // }
        // if (req.query.tiktok_average_like) {
        //     const { min, max } = req.query.tiktok_average_like;
        //     query.tiktok_average_like = { $gte: parseInt(min), $lte: parseInt(max) };;
        // }
        // if (req.query.tiktok_engagement_rate) {
        //     const { min, max } = req.query.tiktok_engagement_rate;
        //     query.tiktok_engagement_rate = { $gte: parseInt(min), $lte: parseInt(max) };
        // }

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
        console.log(query);
        res.status(200).json(verificationProfiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
