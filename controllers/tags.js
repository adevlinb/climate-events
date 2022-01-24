const Event = require('../models/event');
const Tag = require('../models/tag');


module.exports = {
    create
}

function create(req, res) {
    req.body.event = req.params.id
    console.log(req.body)
    Tag.findOne({tag: req.body.tag}, function(err, tag){
        if (tag) {
            res.redirect(`/events/${req.params.id}`)
        } else {
            Tag.create(req.body, function(err, tag){
                console.log(tag)
                Tag.find({}, function(err, tags){
                    res.redirect(`/events/${req.params.id}`)
                })
            })
        }
    })
}