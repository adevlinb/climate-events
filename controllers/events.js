const Event = require('../models/event');
const Tag = require('../models/tag');
const fetch = require('node-fetch');
const PTV_KEY = process.env.PTV_KEY
const PTV_URL = 'https://api.myptv.com/geocoding/v1/locations/by-text?'
const PTV_ENCODE = process.env.PTV_ENCODE

module.exports = {
    index,
    new: newEvent,
    past,
    create,
    show,
    tags
}

function index(req, res) {
    var today = new Date;
    Event.find({ dateOf: {$gt: today}}, function(err, events){
        res.render('events/index', { titlePage: "All Events", events });
    });     
}

function newEvent(req, res) {
    res.render('events/new', { titlePage: 'Add Event:'});
}

function past(req, res) {
    var today = new Date;
    Event.find({dateOf: {$lt: today}}, function(err, events){
    res.render('events/past', { titlePage: 'Past Events', events});
    });
}


function create(req, res) {
    let location;
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
                console.log(event, 1);
                var today = new Date;
                Event.find({dateOf: { $gt: today }}, function (err, events) {
                    res.render('events/index', { titlePage: "All Events", events });
                }); 
            })
        });

};

function show(req, res) {
    Event.findById(req.params.id, function (err, event) {
        res.render('events/show', { titlePage: 'Details', event });
    });
};

function tags(req, res) {
    res.render('events/search', {titlePage: 'Search for tags!'})
}