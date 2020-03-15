import server from "./server";

export default function() {
  const SocketIO = require("socket.io");

  const io = SocketIO(server);

  var allClients = {};

  io.on("connection", function(socket) {
    console.log("a user connected");

    socket.broadcast.emit("user_connection", {
    });

    socket.on("subscribe", function(room) {
      console.log("joining room", room);
      socket.join(room);
    });

    socket.on("send_private_message", function(data) {
      console.log("sending room post", data.room, data.content);

      socket.broadcast.to(data.room).emit("private_message", data);
    });

    socket.on("disconnect", function() {
      console.log("user disconnected ", allClients[socket.id]);
    });
  });
}
