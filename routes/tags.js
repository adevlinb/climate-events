var express = require('express');
var router = express.Router();
const tagsCtrl = require('../controllers/tags');
var isLoggedIn = require('../config/auth');

// delete tags from event
router.delete('/:tag/events/:eid', isLoggedIn, tagsCtrl.deleteTag);
// path to create tags!
router.post('/event/:id', isLoggedIn, tagsCtrl.create);

module.exports = router;