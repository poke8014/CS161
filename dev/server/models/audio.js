const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('audio', audioSchema);