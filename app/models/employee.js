var mongoose = require('mongoose');

module.exports = mongoose.model('Employee', {
    name: {
        type: String,
        default: ''
    },
    surname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    }
});