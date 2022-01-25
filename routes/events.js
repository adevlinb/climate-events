var express = require('express');
var router = express.Router();
var eventsCtrl = require('../controllers/events');
var isLoggedIn = require('../config/auth');

/* GET users listing. */
router.get('/', isLoggedIn, eventsCtrl.index);
// add event
router.get('/new', isLoggedIn, eventsCtrl.new);
// past events
router.get('/past', isLoggedIn, eventsCtrl.past);
// create new event
router.post('/', isLoggedIn, eventsCtrl.create);
// show details page
router.get('/:id', isLoggedIn, eventsCtrl.show);
// post new tag to current event
router.post('/:tid/tags/:eid', isLoggedIn, eventsCtrl.addTag);
// render edit ejs
router.get('/:eid/edit', isLoggedIn, eventsCtrl.edit)


module.exports = router;