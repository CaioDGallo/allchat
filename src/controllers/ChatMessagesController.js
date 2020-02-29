const ChatMessage = require('../models/ChatMessage')

//Index, Show, Store, Update and Destroy

module.exports = {
    async index(request, response){

        const { sender_id, receiver_id } = request.query

        const messages = await ChatMessage.find({
             'sender_id': sender_id, 
             'receiver_id': receiver_id 
            })

        return response.json(messages);
    },

    async store(request, response){
        const { content, sender_id, receiver_id } = request.body;

        let message = await ChatMessage.create({
            content,
            sender_id,
            receiver_id
        })

        return response.json(message);
    },
}