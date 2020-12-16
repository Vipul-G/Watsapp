const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    message: {type: String, required: true},
    timestamp: {type: String, required: true},
    seen: {type: Boolean, default: false}
});

module.exports = mongoose.model('chats', chatSchema);