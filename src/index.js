const express = require('express');
const WebSocket = require('ws');

const app = express();

app.use(express.json());

app.get('/', () => {})

var server = app.listen(5000);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        
        wss.clients
        .forEach(client => {
            if (client != ws) {
                client.send(`Hello, broadcast message -> ${message}`);
            }    
        });
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});