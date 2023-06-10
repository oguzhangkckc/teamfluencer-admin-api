const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firebase_id: {
        type: String,
    },
    phone: {
        type: String,
        unique: true,
    },
    notification_permission: Boolean,
    notification_token: String,
    insta: {
        last_scrape: Date,
        id: String,
        access_token: String,
        username: {
            type: String,
            unique: true,
        },
        full_name: String,
        biography: String,
        profile_pic: String,
        followers: Number,
        following: Number,
        average_like: Number,
        post_number: Number,
        shared_posts: [
            {
                media_url: String,
                like_count: String,
                comment_count: Number,
                description: String,
                location: {
                    name: String,
                    address: String,
                    city: String,
                    lng: Number,
                    lat: Number,
                },
                face_details: Schema.Types.Mixed,
                moderation_labels: Schema.Types.Mixed,
            },
        ],
        keywords: [String],
    },
    tiktok: {
        username: {
            type: String,
            unique: true,
        },
        keywords: [String],
        tiktok_last_scrape: Date,
        tiktok_nickname: String,
        bio_description: String,
        last_scrape: Date,
        followers: Number,
        following: Number,
        hearts: Number,
        videos: [
            {
                like_count: Number,
                comment_count: Number,
                width: Number,
                height: Number,
                rate: Number,
                download_count: Number,
                play_count: Number,
                share_count: Number,
                whatsapp_share_count: Number,
                forward_count: Number,
                media_url: String,
                music: String,
                author: String,
                album: String,
                ratio: String,
                description: String,
                share_url: String,
                region: String,
                cover: String,
                dynamicCover: String,
            },
        ],
        profile_pic: String,
        createTime: Date,
        privateAccount: Boolean,
        verified: Boolean,
        secret: Boolean,
        tiktok_average_like: Number,
        tiktok_engagement_rate: Number,
        tiktok_access_token: String,
        tiktok_refresh_token: String,
        open_id: String,
        refresh_expires_in: String,
        log_id: String,
        union_id: String
    },
    job: { type: String, default: '' },
    name: { type: String },
    surname: { type: String },
    score: { type: Number, default: 0 },
    email: { type: String, default: '', unique: true },
    birthday: Date,
    birthday_lastupdate: Date,
    age: Number,
    gender: String,
    profile_complete: Boolean,
    school_type: String,
    school_name: {
        type: String,
        trim: true,
    },
    password: Number,
    passwordTime: Date,
    city: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    language: String,
    money: {
        paparaAccountNo: Number,
        current: { type: Number, default: 0 },
        currency: String,
        city: String,
        county: String,
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        id: {
            type: String,
        },
        exchanges: [
            {
                _id: false,
                operation: String,
                amount: Number,
                action_time: Date,
                application_id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Application',
                },
            },
        ],
    },
    hobbies: [String],
    sharing_type: String,
    last_login: {
        type: Date,
        default: Date.now,
    },
    applications_update: {
        type: Date,
        default: Date.now,
    },
    hasNotificationPermission: {
        type: Boolean,
        default: false,
    },
    onesignal_pushToken: {
        type: String,
        default: '',
    },
    onesignal_userId: {
        type: String,
        default: '',
    },
    latitude: {
        type: Number,
        default: '',
    },
    longitude: {
        type: Number,
        default: '',
    },
    timezone: {
        type: String,
        default: '',
    },
    currency: {
        type: String,
    },
    verification: { type: Boolean, default: false },
    denied_verification: { type: Boolean, default: false },
    verification_last_action: { type: Date },
    deleted: { type: Boolean, default: false },
    deviceInfo: { type: Schema.Types.Mixed, default: false }
});

userSchema.index({ 'insta.followers': 1, 'insta.average_like': 1 });
userSchema.index({ gender: 1 });
userSchema.index({ age: 1 });
userSchema.index({ city: 1 });

module.exports = mongoose.model('User', userSchema);
