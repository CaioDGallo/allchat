const Yup = require('yup');
const User = require('../models/User');

//Index, Show, Store, Update and Destroy

module.exports = {
    async index(request, response) {
        const users = await User.find()

        return response.json(users);
    },

    async store(request, response) {
        const schema = Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6)
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Validation failed' });
        }

        const { username, email, password } = request.body;

        let user = await User.findOne({ email })

        if (!user) {

            user = await User.create({
                username,
                email,
                password
            })
        } else {
            return response.status(400).json({ error: 'Email already registered' });
        }

        return response.json(user);
    },

    async update(request, response) {
        //TODO implement this method
    },

    async delete(request, response) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6)
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Validation failed' });
        }
        const { email } = request.body

        const deleted = await User.deleteOne({
            email
        })

        let message = "Unable to delete dev"

        if (deleted.deletedCount > 0) {
            message = "User successfully deleted"
        }

        return response.json({ message: message })
    },
}