const Event = require('../models/event');
const Tag = require('../models/tag');


module.exports = {
    create,
    deleteTag
}

function create(req, res) {
    console.log("hit the create route via tags")
    Tag.findOne({tag: req.body.tag}, function(err, tag){
        if (tag) {
            res.redirect(`/events/${req.params.id}`)
        } else {
            Tag.create(req.body, function(err, tag){
                res.redirect(`/events/${req.params.id}`)
            });
        }
    });
}

function deleteTag (req, res) {
    let tag = "#" + req.params.tag
    Event.findById(req.params.eid, function (err, event) {
        let newArray = event.tags.filter(function(ele){
            if(ele !== tag) return ele;
        });
        event.tags = newArray;
        event.save(function (err) {
            res.redirect(`/events/${req.params.eid}`);
        });
    });
}

