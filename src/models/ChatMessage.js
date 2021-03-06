const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    content: String,
    sender_id: String,
    receiver_id: String,
    room: String
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);