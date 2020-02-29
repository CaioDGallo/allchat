const User = require('../models/User')

//Index, Show, Store, Update and Destroy

module.exports = {
    async index(request, response){
        const users = await User.find()

        return response.json(users);
    },

    async store(request, response){
        const { username, email, password } = request.body;

        let user = await User.findOne({ email })

        if(!user){
    
            user = await User.create({
                username,
                email,
                password
            })
        }else{
            return response.json({
                'error':'This email is already registered.'
            });
        }

        return response.json(user);
    },

    async update(request, response){
        //TODO implement this method
    },

    async delete(request, response){
        const { email } = request.body

        const deleted = await User.deleteOne({
            email
        })

        let message = "Unable to delete dev"

        if(deleted.deletedCount > 0){
            message = "User successfully deleted"
        }

        return response.json({ message: message})
    },
}