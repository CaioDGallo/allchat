const ChatMessage = require("../models/ChatMessage");
import { RedisClient, getValue } from "../database/RedisClient";

module.exports = {
  async persistMessaagesOnDatabase(messages) {
    await ChatMessage.insertMany(messages);

    const roomId = messages[0].room;
    const cachedRoom = await getValue(roomId);

    if (cachedRoom !== null) {
      var cachedRoomObj = JSON.parse(cachedRoom);

      cachedRoomObj = [];

      RedisClient.set(roomId, JSON.stringify(cachedRoomObj));
    }
  },

  async getMessagesFromDatabase(room) {
    var messages = await ChatMessage.find({
      room: room
    });

    const cachedRoom = await getValue(room);

    if (cachedRoom !== null) {
      const cachedRoomObj = JSON.parse(cachedRoom);
      if(cachedRoomObj){
        messages = [...messages, ...cachedRoomObj];
      }
    }

    // // STORE messages SOMEWHERE, because if client does not receive the response
    // // it needs to be rolled back.
    // messages.forEach((element) => {
    //   if(element.pending){
    //     element.pending = false
    //   }
    // })

    return messages;
  }
};
