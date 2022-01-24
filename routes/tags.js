var express = require('express');
var router = express.Router();
const tagsCtrl = require('../controllers/tags');
var isLoggedIn = require('../config/auth');

// path to create tags!
router.post('/events/:id/tags', tagsCtrl.create);

module.exports = router;