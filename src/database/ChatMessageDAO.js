const ChatMessage = require("../models/ChatMessage");

module.exports = {
  async persistMessaagesOnDatabase(messages) {
    await ChatMessage.insertMany(messages);
  },

  async getMessagesFromDatabase(room) {
    var messages = await ChatMessage.find({
      room: room
    });

    return messages;
  }
};
