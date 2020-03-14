import server from "./server";
import { redis_cache, RedisClient } from "./database/RedisClient";

export default function() {
  const SocketIO = require("socket.io");

  const io = SocketIO(server);
  const ChatMessageDAO = require("../src/database/ChatMessageDAO");

  var allClients = {};

  io.on("connection", function(socket) {
    console.log("a user connected");

    socket.broadcast.emit("user_connection", {
      room: "r1",
      content: "user has joined chat ...",
      sender_id: "123",
      receiver_id: "456",
      pending: true
    });

    socket.on("subscribe", function(room) {
      console.log("joining room", room);
      socket.join(room);

      allClients[socket.id] = room;

      RedisClient.get("cached_messages", (err, cached) => {
        if (err) throw err;

        if (cached !== null) {
          const cachedObj = JSON.parse(cached);

          if (cachedObj[room] == null) {
            cachedObj[room] = [];
          }
            
          //  console.log("cached = ", cachedObj);
          RedisClient.setex("cached_messages", 3600, JSON.stringify(cachedObj));
        }
      });
      RedisClient.setex("cached_messages", 3600, JSON.stringify(redis_cache));
    });

    socket.on("send_private_message", function(data) {
      console.log("sending room post", data.room, data.content);

      RedisClient.get("cached_messages", (err, cached) => {
        if (err) throw err;

        if (cached !== null) {
          const cachedObj = JSON.parse(cached);
          cachedObj[data.room].push(data);
          //  console.log("cached = ", cachedObj);
          RedisClient.setex("cached_messages", 3600, JSON.stringify(cachedObj));
        }
      });
      socket.broadcast.to(data.room).emit("private_message", data);
    });

    socket.on("disconnect", function() {
      console.log("user disconnected ", allClients[socket.id]);

      RedisClient.get("cached_messages", (err, cached) => {
        if (err) throw err;

        if (cached !== null) {
          const roomId = allClients[socket.id];
          const cachedObj = JSON.parse(cached);

          const messages = cachedObj[roomId];
          if (messages && messages.length > 0) {
            ChatMessageDAO.persistMessaagesOnDatabase(messages);
          }
        }
      });
    });
  });
}
