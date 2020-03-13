const ChatMessage = require("../models/ChatMessage");
import { RedisClient } from "../database/RedisClient";

module.exports = {
  async persistMessaagesOnDatabase(messages) {
    await ChatMessage.insertMany(messages);

    RedisClient.get("cached_messages", (err, cached) => {
      if (err) throw err;

      if (cached !== null) {
        const roomId = messages[0].room;
        const cachedObj = JSON.parse(cached);

        //cachedObj[roomId] = [];
        RedisClient.setex("cached_messages", 3600, JSON.stringify(cachedObj));
      }
    });
  },

  async getMessagesFromDatabase(room) {
    const messages = await ChatMessage.find({
      room: room
    });

    //TODO This piece of code is not working, it is supposed to get messages from cache
    // when they weren't persisted on mongo yet, but the other client did not disconnect.
    // So the messages are only in cache, and not in DB. Append messages from cache to the ones gotten, 
    // from DB. 
    // Test implementations with new package [async-redis]
    RedisClient.get("cached_messages", (err, cached) => {
      if (err) throw err;

      if (cached !== null) {
        const cachedObj = JSON.parse(cached);
        console.log("teste inside redis", cachedObj[room]);
        messages.concat(cachedObj[room]);
      }
    });

    console.log("teste ", messages);
    return messages;
  }
};
