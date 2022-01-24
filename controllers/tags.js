const Event = require('../models/event');
const Tag = require('../models/tag');


module.exports = {
    create
}

function create(req, res) {
    console.log(req.body.tags)
    let tagsArray = req.body.tags.split(' ')
    console.log(tagsArray)
    res.redirect(`/events/${req.params.id}`)
}