const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    image: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    thumbImage: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Media', mediaSchema);