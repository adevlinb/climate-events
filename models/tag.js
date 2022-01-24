const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tag: {
        type: String,
        match: /#[a-z-]{2,}/
    },

})

module.exports = mongoose.model('Tag', tagSchema);