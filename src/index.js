const express = require('express');
const WebSocket = require('ws');
const SocketIO = require('socket.io');

const INDEX = '/index.html';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))

var server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = SocketIO(server)

io.on('connection', function (socket) {
    console.log('a user connected');
    
    socket.broadcast.emit('user_connection', {
        'message': 'user has joined chat ...',
        'id': Math.random(),
    })

    socket.on('message', function (data) {
        console.log(data)
        socket.broadcast.emit('message', data)
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});