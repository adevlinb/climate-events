var express = require('express');
var router = express.Router();
var eventsCtrl = require('../controllers/events');
var isLoggedIn = require('../config/auth');

/* GET users listing. */
router.get('/', isLoggedIn, eventsCtrl.index);
// post new tag to current event
router.post('/:eid/tags/:tid', isLoggedIn, eventsCtrl.addTag);
// add event
router.get('/new', isLoggedIn, eventsCtrl.new);
// past events
router.get('/past', isLoggedIn, eventsCtrl.past);
// get tag search page
router.get('/tags', isLoggedIn, eventsCtrl.tags);
// create new event
router.post('/', isLoggedIn, eventsCtrl.create);
// show details page
router.get('/:id', isLoggedIn, eventsCtrl.show);


module.exports = router;