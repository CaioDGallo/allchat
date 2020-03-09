const { Router } = require('express');
const UserController = require('./controllers/UserController');
const ChatMessageController = require('./controllers/ChatMessagesController');
const SessionController = require('./controllers/SessionController');

const authMiddleware = require('./middlewares/auth');

const routes = Router();

//Login Routes
routes.post('/session', SessionController.store);

//User Routes
routes.post('/user', UserController.store);

routes.use(authMiddleware);

//Protected user Routes
routes.get('/user', UserController.index);
routes.delete('/user', UserController.delete);
routes.put('/user', UserController.update);

//ChatMessage Routes
routes.get('/messages', ChatMessageController.index);
routes.post('/messages', ChatMessageController.store);

module.exports = routes;