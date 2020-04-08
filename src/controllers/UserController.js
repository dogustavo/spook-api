const User = require('../models/User');

module.exports = {

    async store(req, res) {
        const { 
            name,
            email,
            password,
            data_nascimento,
            avatar 
        } = req.body;

        const userExists = await User.findOne({email: email});

        if(userExists) {
            return res.json(userExists);
        }

        const user = await User.create({
            name: name,
            email: email,
            password: password,
            data_nascimento: data_nascimento,
            avatar: avatar 
        });

        return res.json(user);
    }

};