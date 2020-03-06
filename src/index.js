require('dotenv').config();

const express = require('express');
const SocketIO = require('socket.io');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb+srv://caiogallo:forthehorde2401@cluster0-evtam.mongodb.net/allchatdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({ origin: 'http://localhost:3333' }))
//app.use(cors({ origin: 'http://allchat-web.herokuapp.com' }))
app.use(express.json());
app.use(routes);

var server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = SocketIO(server)

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.broadcast.emit('user_connection', {
        'room' : "1",
        'content': 'user has joined chat ...',
        'sender_id': '123',
        'receiver_id': '456',
    })

    socket.on('subscribe', function(room) {
        console.log('joining room', room);
        socket.join(room);
    });
    
    socket.on('send_private_message', function(data) {
        console.log('sending room post', data.room, data.content);
        socket.broadcast.to(data.room).emit('private_message', data);
    });

    // socket.on('message', function (data) {
    //     console.log(data)
    //     socket.broadcast.emit('message', data)
    // });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});