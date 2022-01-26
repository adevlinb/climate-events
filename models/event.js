const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    id: Number,
    main: String,
    description: String,
    icon: String,
    temperature: Number,
    feels_like: Number,
    humidity: Number,
    wind_speed: Number,
}, { timestamps: true }
)


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
    tags: [String], 
    weather: [weatherSchema]
});


module.exports = mongoose.model('Event', eventSchema);