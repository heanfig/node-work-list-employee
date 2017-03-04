var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    user: {
        type: String,
        default: ''
    },
    pass: {
        type: String,
        default: ''
    }
});