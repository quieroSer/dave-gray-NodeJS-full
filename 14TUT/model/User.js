const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: 'string',
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        admin: Number
    },
    password: {
        type: 'string',
        required: true
    },
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema)