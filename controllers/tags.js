const Event = require('../models/event');
const Tag = require('../models/tag');


module.exports = {
    create
}

function create(req, res) {
    Tag.findOne({tag: req.body.tag}, function(err, tag){
        if (tag) {
            res.redirect(`/events/${req.params.id}`)
        } else {
            Tag.create(req.body, function(err, tag){
                res.redirect(`/events/${req.params.id}`)
            })
        }
    })
}