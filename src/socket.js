import server from "./server";
import { cacheMessage, registerRoom, storeCachedMessagesOnDatabase } from "./database/RedisClient";

export default function() {
  const SocketIO = require("socket.io");

  const io = SocketIO(server);

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

      registerRoom(room)
    });

    socket.on("send_private_message", function(data) {
      console.log("sending room post", data.room, data.content);

      cacheMessage(data)

      socket.broadcast.to(data.room).emit("private_message", data);
    });

    socket.on("disconnect", function() {
      console.log("user disconnected ", allClients[socket.id]);

      const room = allClients[socket.id]
      storeCachedMessagesOnDatabase(room)
    });
  });
}
