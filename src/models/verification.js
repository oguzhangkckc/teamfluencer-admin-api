const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    application_date: Date,
    last_action: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      insta_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InstaUser',
      },
      denied_verification: { type: Boolean, default: false },
      status: { type: Boolean, default: false },
    });

module.exports = mongoose.model('Verification', verificationSchema);
