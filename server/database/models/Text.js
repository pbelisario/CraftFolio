const mongoose = require('mongoose');

require('mongoose-type-url');

const Schema = mongoose.Schema;

const textSchema = new Schema({
    'background-color': {
        type: String,
        required: true,
    },
    'border-color': {
        type: String,
        required: true,
    },
    'font-size': {
        type: String,
        required: true,
    },
    'text-color': {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Text', textSchema);