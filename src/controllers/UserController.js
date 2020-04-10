const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = {
    async create(req, res) {
        try {
            const { 
                name,
                email,
                password,
                data_nascimento,
                avatar 
            } = req.body;
    
            if(await User.findOne({ email })) {
                return res.status(400).send({ error: 'Este email já está sendo utilizado' });
            }
    
            const user = await User.create({
                name,
                email,
                password,
                data_nascimento,
                avatar 
            });

            user.password = undefined;
    
            return res.json(user);
        } catch (error) {
            return res.status(400).send({ error: 'Falha no cadastro' });
        }
        
    },

    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if(!user) {
            return res.status(400).send({ error: 'Usuário não encontrado' });
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({ error: 'Senha inválida' });
        }

        res.send({ user });

    }
};