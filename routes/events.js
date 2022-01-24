var express = require('express');
var router = express.Router();
var eventsCtrl = require('../controllers/events');


/* GET users listing. */
router.get('/', eventsCtrl.index);
// add event
router.get('/new', eventsCtrl.new);
// past events
router.get('/past', eventsCtrl.past);
// get tag search page
router.get('/tags', eventsCtrl.tags);
// create new event
router.post('/', eventsCtrl.create);
// show details page
router.get('/:id', eventsCtrl.show);


module.exports = router;