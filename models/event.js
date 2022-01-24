const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        locationName: String,
        latitude: String,
        longitude: String
    },
    dateOf: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    notes: {
        type: String
    },
    timestamps: true
});


module.exports = mongoose.model('Event', eventSchema);