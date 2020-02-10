const express = require('express');
const WebSocket = require('ws');

const INDEX = '/index.html';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))

var server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

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

    ws.on('close', () => console.log('Client disconnected'));
});