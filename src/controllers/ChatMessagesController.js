const ChatMessageDAO = require('../database/ChatMessageDAO')

module.exports = {
    async index(request, response) {

        const { room } = request.query

        const messages = await ChatMessageDAO.getMessagesFromDatabase(room)

        try {
            return response.json(messages);
        } catch (err) {
            console.log('Error: ' + err);
        }
    },

    async store(request, response) {
        const { messages } = request.body;

        await ChatMessageDAO.persistMessaagesOnDatabase(messages)

        return response.json("messages inserted");
    },
}