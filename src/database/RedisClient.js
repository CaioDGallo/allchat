const redis = require("redis");
const asyncRedis = require("async-redis");

const RedisClient = redis.createClient();
const AsyncRedisClient = asyncRedis.createClient();
const redis_cache = {};

RedisClient.setex("cached_messages", 3600, JSON.stringify(redis_cache));

var setValue = async (key, value) => {
  return await AsyncRedisClient.set(key, value);
};

var getValue = async key => {
  let val = await AsyncRedisClient.get(key);
  return val;
};

function registerRoom(room){
  RedisClient.get("cached_messages", (err, cached) => {
    if (err) throw err;

    if (cached !== null) {
      const cachedObj = JSON.parse(cached);

      room in cachedObj ? console.log('exists') : cachedObj[room] = []

      RedisClient.setex("cached_messages", 3600, JSON.stringify(cachedObj));
    }
  });
}

function cacheMessage(data){
  RedisClient.get("cached_messages", (err, cached) => {
    if (err) throw err;

    if (cached !== null) {
      const cachedObj = JSON.parse(cached);
      cachedObj[data.room].push(data);
      //  console.log("cached = ", cachedObj);
      RedisClient.setex("cached_messages", 3600, JSON.stringify(cachedObj));
    }
  });
}

function storeCachedMessagesOnDatabase(room){
  RedisClient.get("cached_messages", (err, cached) => {
    if (err) throw err;
  
    if (cached !== null) {
      const ChatMessageDAO = require("./ChatMessageDAO");
      const cachedObj = JSON.parse(cached);
  
      const messages = cachedObj[room];

      if (messages && messages.length > 0) {
        ChatMessageDAO.persistMessaagesOnDatabase(messages);
      }
    }
  });
}

export { RedisClient, setValue, getValue, registerRoom, cacheMessage, storeCachedMessagesOnDatabase };
