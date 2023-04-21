const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    guest: {
        type: Boolean
    }
})

module.exports = mongoose.model('audioFiles', audioSchema);