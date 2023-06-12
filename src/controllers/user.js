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
    const count = 200;

    try {
        const filter = {};

        if (req.query.profile_complete) {
            filter['profile_complete'] = req.query.profile_complete;
        }
        if (req.query.country) {
            filter['country'] = req.query.country;
        }
        if (req.query.city) {
            filter['city'] = req.query.city;
        }

        if (req.query.gender) {
            filter['gender'] = req.query.gender;
        }
        if (req.query.age) {
            filter['age'] = req.query.age;
        }
        if (req.query.min_age && req.query.max_age) {
            filter['age'] = { $gte: req.query.min_age, $lte: req.query.max_age };
        } else if (req.query.min_age) {
            filter['age'] = { $gte: req.query.min_age };
        } else if (req.query.max_age) {
            filter['age'] = { $lte: req.query.max_age };
        }
        if (req.query.followers) {
            filter['insta.followers'] = req.query.followers;
        }
        if (req.query.min_followers && req.query.max_followers) {
            filter['insta.followers'] = { $gte: req.query.min_followers, $lte: req.query.max_followers };
        } else if (req.query.min_followers) {
            filter['insta.followers'] = { $gte: req.query.min_followers };
        } else if (req.query.max_followers) {
            filter['insta.followers'] = { $lte: req.query.max_followers };
        }
        if (req.query.tiktok_followers) {
            filter['tiktok_followers'] = req.query.tiktok_followers;;
        }
        if (req.query.min_tiktok_followers && req.query.max_tiktok_followers) {
            filter['tiktok.followers'] = { $gte: req.query.min_tiktok_followers, $lte: req.query.max_tiktok_followers };
        } else if (req.query.min_tiktok_followers) {
            filter['tiktok.followers'] = { $gte: req.query.min_tiktok_followers };
        } else if (req.query.max_tiktok_followers) {
            filter['tiktok.followers'] = { $lte: req.query.max_tiktok_followers };
        }
        if (req.query.post_number) {
            filter['insta.post_number'] = req.query.post_number;
        }

        if (req.query.min_post_number && req.query.max_post_number) {
            filter['insta.post_number'] = { $gte: req.query.min_post_number, $lte: req.query.max_post_number };
        } else if (req.query.min_post_number) {
            filter['insta.post_number'] = { $gte: req.query.min_post_number };
        } else if (req.query.max_post_number) {
            filter['insta.post_number'] = { $lte: req.query.max_post_number };
        }

        if (req.query.average_likes) {
            filter['insta.average_likes'] = req.query.average_likes;
        }

        if (req.query.min_average_likes && req.query.max_average_likes) {
            filter['insta.average_like'] = { $gte: req.query.min_average_likes, $lte: req.query.max_average_likes };
        } else if (req.query.min_average_likes) {
            filter['insta.average_like'] = { $gte: req.query.min_average_likes };
        } else if (req.query.max_average_likes) {
            filter['insta.average_like'] = { $lte: req.query.max_average_likes };
        }

        if (req.query.videos) {
            filter['videos'] = req.query.videos;
        }

        if (req.query.min_videos && req.query.max_videos) {
            filter['tiktok.videos.length'] = { $gte: req.query.min_videos, $lte: req.query.max_videos };
        } else if (req.query.min_videos) {
            filter['tiktok.videos.length'] = { $gte: req.query.min_videos };
        } else if (req.query.max_videos) {
            filter['tiktok.videos.length'] = { $lte: req.query.max_videos };
        }

        if (req.query.tiktok_average_likes) {
            filter['tiktok.tiktok_average_likes'] = req.query.tiktok_average_likes;
        }

        if (req.query.min_tiktok_average_likes && req.query.max_tiktok_average_likes) {
            filter['tiktok.tiktok_average_likes'] = { $gte: req.query.min_tiktok_average_likes, $lte: req.query.max_tiktok_average_likes };
        } else if (req.query.min_tiktok_average_likes) {
            filter['tiktok.tiktok_average_likes'] = { $gte: req.query.min_tiktok_average_likes };
        } else if (req.query.max_tiktok_average_likes) {
            filter['tiktok.tiktok_average_likes'] = { $lte: req.query.max_tiktok_average_likes };
        }

        if (req.query.tiktok_engagement_rate) {
            filter['tiktok.tiktok_engagement_rate'] = req.query.tiktok_engagement_rate;
        }

        if (req.query.min_tiktok_engagement_rate && req.query.max_tiktok_engagement_rate) {
            filter['tiktok.tiktok_engagement_rate'] = { $gte: req.query.min_tiktok_engagement_rate, $lte: req.query.max_tiktok_engagement_rate };
        } else if (req.query.min_tiktok_engagement_rate) {
            filter['tiktok.tiktok_engagement_rate'] = { $gte: req.query.min_tiktok_engagement_rate };
        } else if (req.query.max_tiktok_engagement_rate) {
            filter['tiktok.tiktok_engagement_rate'] = { $lte: req.query.max_tiktok_engagement_rate };
        }


        const verification_false = await Verification.find({ status: false, denied_verification: false })
            .populate({
                path: 'user',
                match: filter
            })
            .limit(count)
            .exec();

        const verifiedUsers = verification_false
            .filter((profile) => profile.user !== null)
            .map((profile) => {
                const user = profile.user;
                return {
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    phone: user.phone,
                    profile_complete: user.profile_complete,
                    country: user.country,
                    city: user.city,
                    gender: user.gender,
                    followers: user.insta.followers,
                    tiktok_followers: user.tiktok.followers,
                    post_number: user.insta.post_number,
                    average_likes: user.insta.average_like,
                    videos: user.tiktok.videos.length,
                    tiktok_average_likes: user.tiktok.tiktok_average_like,
                    tiktok_engagement_rate: user.tiktok.tiktok_engagement_rate,
                };
            });
        res.status(200).json(verifiedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};