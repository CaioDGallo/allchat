const express = require('express');
const WebSocket = require('ws');

const INDEX = '/index.html';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))

var server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new WebSocket.Server({ server });

function getUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on('connection', (ws) => {

    ws.on('message', (message) => {

        var receivedMessage = JSON.parse(message)

        var createdMessage;
        if(typeof receivedMessage.user == 'string'){
            createdMessage = receivedMessage.user + ': ' +receivedMessage.message
        }else{
            createdMessage = receivedMessage.message
        }

        var messageObject = {
            'message': createdMessage,
            'id': getUniqueID(),
        }
        
        wss.clients
        .forEach(client => {
            if (client != ws) {
                client.send(JSON.stringify(messageObject));
            }    
        });
    });

    ws.send(JSON.stringify({
        'message': 'User connected to server',
        'id': getUniqueID(),
    }));

    ws.on('close', () => console.log('Client disconnected'));
});