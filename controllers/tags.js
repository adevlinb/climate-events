const Event = require('../models/event');
const Tag = require('../models/tag');


module.exports = {
    create,
    deleteTag
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

function deleteTag (req, res) {
    Tag.findById(req.params.tid, function (err, tag) {
        Event.findById(req.params.eid, function (err, event) {
            event.tags = event.tags.filter(function(ele){
                if(ele !== tag.tag) return ele;
            });
            event.save(function (err) {
                res.redirect(`/events/${req.params.eid}`);
            });
        });
        
    });
}