const ChatMessage = require('../models/ChatMessage')

//Index, Show, Store, Update and Destroy

module.exports = {
    async index(request, response) {

        const { room } = request.query

        const messages = await ChatMessage.find({
            'room': room
        })

        try {
            return response.json(messages);
        } catch (err) {
            console.log('Error: ' + err);
        }
    },

    async store(request, response) {
        const { messages } = request.body;

        messages.forEach((item, index) => {
            ChatMessage.create({
                "content": item.content,
                "sender_id": item.sender_id,
                "receiver_id": item.receiver_id,
                "room": item.room
            })
        })

        return response.json("messages inserted");
    },
}