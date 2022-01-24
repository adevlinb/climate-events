const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tag: {
        type: String,
        match: /[A-F][1-99]\d?/
    },

    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
  
})

module.exports = mongoose.model('Tag', tagSchema);