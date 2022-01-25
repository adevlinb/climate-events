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
    addTag,
    edit
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
                console.log(event, 1);
                var today = new Date;
                Event.find({ dateOf: { $gt: today } }, function (err, events) {
                    res.render('events/index', { titlePage: "All Events", events });
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