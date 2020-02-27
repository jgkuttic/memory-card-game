const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../configs/config');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User'
    },
    updated: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
            type: String
        },
    resetPasswordExpires: {
        type: Date
    }
});

const User = module.exports = mongoose.model('User', UserSchema);