const redis = require("redis");
const asyncRedis = require("async-redis");

const RedisClient = redis.createClient();
const AsyncRedisClient = asyncRedis.createClient();

var setValue = async (key, value) => {
  return await AsyncRedisClient.set(key, value);
};

var getValue = async key => {
  let val = await AsyncRedisClient.get(key);
  return val;
};

function registerRoom(room){
  RedisClient.get(room, (err, cachedRoom) => {
    if (err) throw err;

    if (cachedRoom == null) {
      //const cachedRoomObj = JSON.parse(cachedRoom);

      //room in cachedRoomObj ? console.log('exists') : cachedRoomObj[room] = []

      RedisClient.set(room, JSON.stringify([]));
    }
  });
}

function cacheMessage(data){
  RedisClient.get(data.room, (err, cachedRoom) => {
    if (err) throw err;

    if (cachedRoom !== null) {
      const cachedRoomObj = JSON.parse(cachedRoom);
      cachedRoomObj.push(data);
      //  console.log("cached = ", cachedObj);
      RedisClient.set(data.room, JSON.stringify(cachedRoomObj));
    }
  });
}

function storeCachedMessagesOnDatabase(room){
  if(room == null){
    console.log('room broken', room)
    return
  }

  RedisClient.get(room, (err, cachedRoom) => {
    if (err) throw err;
  
    if (cachedRoom !== null) {
      const ChatMessageDAO = require("./ChatMessageDAO");
      const cachedRoomObj = JSON.parse(cachedRoom);
  
      const messages = cachedRoomObj;

      if (messages && messages.length > 0) {
        ChatMessageDAO.persistMessaagesOnDatabase(messages);
      }
    }
  });
}

function setMessageAsDelivered(socket ,data){
  RedisClient.get(data.room, (err, cachedRoom) => {
    if (err) throw err;

    if (cachedRoom !== null) {
      const cachedRoomObj = JSON.parse(cachedRoom);
      cachedRoomObj.forEach((element) => {
        if(element._id == data._id){
          element.pending = false
        }
      })
      //  console.log("cached = ", cachedObj);
      RedisClient.set(data.room, JSON.stringify(cachedRoomObj));
      socket.broadcast.to(data.room).emit("delivered_confirmation", data);
    }
  });
}

export { RedisClient, setValue, getValue, registerRoom, cacheMessage, storeCachedMessagesOnDatabase, setMessageAsDelivered };
