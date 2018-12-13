var mongoose = require('mongoose');

module.exports = mongoose.model('Patients', {
    text: {
        type: String,
        default: ''
    }
});