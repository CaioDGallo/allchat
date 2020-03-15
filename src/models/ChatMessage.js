const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    _id: String,
    content: String,
    sender_id: String,
    receiver_id: String,
    room: String,
    pending: Boolean
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);