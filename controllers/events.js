const Event = require('../models/event');
const Tag = require('../models/tag');
const Weather = require
const fetch = require('node-fetch');
const { get } = require('express/lib/response');
const PTV_KEY = process.env.PTV_KEY;
const PTV_URL = 'https://api.myptv.com/geocoding/v1/locations/by-text?';
const PTV_ENCODE = process.env.PTV_ENCODE;
const OPENWEATHER_URL = process.env.OPENWEATHER_URL;
const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;

module.exports = {
    index,
    new: newEvent,
    past,
    create,
    show,
    addTag,
    edit,
    update,
    getWeather
}

function index(req, res) {
    var today = new Date;
    const tag = req.query.tag
    const query = tag ? 
        { tags: `#${tag}`, dateOf: { $gt: today } } : { dateOf: { $gt: today } };
    Event.find(query, function (err, events) {
        Tag.find({}, function (err, tags){
            res.render('events/index', { titlePage: "Events", events, tags});
        })
    });
}

function newEvent(req, res) {
    res.render('events/new', { titlePage: 'Add Event:' });
}

function past(req, res) {
    var today = new Date;
    Event.find({ dateOf: { $lt: today } }, function (err, events) {
        res.render('events/past', { titlePage: 'Past Events', events });
    });
}


function create(req, res) {
    let location;
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    const qString = req.body.locationName
    const options = {
        method: "GET",
        headers: { apiKey: `${PTV_KEY}`, "Content-Type": "application/json" }
    }
    fetch(`${PTV_URL}${PTV_ENCODE}${qString}${PTV_KEY}`, options)
        .then(res => res.json())
        .then(result => {
            location = {
                locationName: req.body.locationName,
                latitude: result.locations[0].referencePosition.latitude,
                longitude: result.locations[0].referencePosition.longitude
            }
            req.body.location = location;

            var event = new Event(req.body);
            event.save(function (err) {
                if (err) return res.redirect('/events/new');
                var today = new Date;
                Event.find({ dateOf: { $gt: today } }, function (err, events) {
                    res.redirect('events/index', { titlePage: "All Events", events });
                });
            })
        });

};

function show(req, res) {
    var today = new Date;
    Event.findById(req.params.id, function (err, event) {
        Tag.find({tag: {$nin: event.tags}}, function (err, tags) {
            res.render('events/show', { titlePage: 'Details', event, tags, today });
        })
    });
};

function addTag(req, res) {
    Tag.findById(req.params.tid, function (err, tag) {
        Event.findById(req.params.eid, function (err, event) {
            event.tags.push(tag.tag);
            event.save(function (err) {
                res.redirect(`/events/${req.params.eid}`);
            });
        });
    });
}

function edit(req, res) {
    Event.findById(req.params.eid, function(err, event){
        res.render('events/edit', {titlePage: 'Edit Event', event})
    })
}

function update(req, res) {
    Event.findOneAndUpdate({ "event._id": req.params.id }, req.body, { new: true }, function (err, event) {
        event.save();
        if (err || !event) return res.redirect('/events');
        res.redirect(`/events/${event._id}`);
        }
    );
}

function getWeather(req, res) {
    let weatherData;
    Event.findById(req.params.eid, function(err, event){
    const options = {
        method: "GET",
        headers: { apiKey: `${OPENWEATHER_KEY}`, "Content-Type": "application/json" }
    }
 
    fetch(`${OPENWEATHER_URL}lat=${event.location.latitude}&lon=${event.location.longitude}&appid=${OPENWEATHER_KEY}&units=imperial`, options)
        .then(res => res.json())
        .then(result => {
            weatherData = {
                id: result.weather[0].id,
                main: result.weather[0].main,
                description: result.weather[0].description,
                icon: result.weather[0].icon,
                temperature: result.main.temp,
                feels_like: result.main.feels_like,
                humidity: result.main.humidity,
                wind_speed: result.wind.speed
            }
            event.weather.unshift(weatherData);
            event.save(function(err){
            res.redirect(`/events/${event._id}`);
            })
        });       
    });
}

