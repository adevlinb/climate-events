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
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        timestamps: true
    },
    userName: {
        type: String
    },
    userAvatar: {
        type: String
    },
    tags: [String]
});


module.exports = mongoose.model('Event', eventSchema);