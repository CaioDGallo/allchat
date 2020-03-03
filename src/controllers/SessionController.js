const Yup = require('yup');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../config/auth');

module.exports = {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // TODO - Implement this way later
        // if (!(await user.checkPassword(password))) {
        //   return res.status(401).json({ error: 'Password does not match' });
        // }

        // Temporary
        if (user.password != password) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { _id, name } = user;

        console.log('secret: ' + authConfig.secret);

        return res.json({
            user: {
                _id,
                name,
                email
            },
            token: jwt.sign({ _id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });
    }
}