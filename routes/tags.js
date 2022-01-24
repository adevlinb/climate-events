var express = require('express');
var router = express.Router();
const tagsCtrl = require('../controllers/tags');


// path to create tags!
router.post('/events/:id/tags', tagsCtrl.create);

module.exports = router;