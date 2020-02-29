const { Router } = require('express');
const UserController = require('./controllers/UserController');
const ChatMessageController = require('./controllers/ChatMessagesController');

const routes = Router();

//User Routes
routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
routes.delete('/user', UserController.delete);
routes.put('/user', UserController.update);

//ChatMessage Routes
routes.get('/messages', ChatMessageController.index);
routes.post('/messages', ChatMessageController.store);

module.exports = routes;