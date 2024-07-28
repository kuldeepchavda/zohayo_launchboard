const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,

    },
    created: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('Users-launchboard', userSchema);

module.exports = User;
