const ChatMessage = require("../models/ChatMessage");
import { RedisClient, getValue } from "../database/RedisClient";

module.exports = {
  async persistMessaagesOnDatabase(messages) {
    await ChatMessage.insertMany(messages);

    RedisClient.get("cached_messages", (err, cached) => {
      if (err) throw err;

      if (cached !== null) {
        const roomId = messages[0].room;
        const cachedObj = JSON.parse(cached);

        cachedObj[roomId] = [];
        RedisClient.setex("cached_messages", 3600, JSON.stringify(cachedObj));
      }
    });
  },

  async getMessagesFromDatabase(room) {
    var messages = await ChatMessage.find({
      room: room
    });

    const cached = await getValue("cached_messages");

    if (cached !== null) {
      const cachedObj = JSON.parse(cached);
      //console.log("teste inside redis", cachedObj);
      if(cachedObj[room]){
        messages = [...messages, ...cachedObj[room]];
      }
    }

    //console.log("teste XD", messages);
    return messages;
  }
};
