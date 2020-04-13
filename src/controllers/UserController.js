const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: '30 days',
    });
}

module.exports = {
    async create(req, res) {
        try {
            const { 
                name,
                email,
                password,
                data_nascimento,
                avatar,
				likes,
				deslikes 
            } = req.body;
    
            if(await User.findOne({ email })) {
                return res.status(400).send({ error: 'Este email já está sendo utilizado' });
            }
    
            const user = await User.create({
                name,
                email,
                password,
                data_nascimento,
                avatar,
				likes,
				deslikes 
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

        user.password = undefined;

        res.send({ 
            user, 
            token: generateToken({ id: user.id })   
        });

    },

    async update(req, res) {
        try {
            const { 
                name,
                email,
                password,
                data_nascimento,
                avatar 
            } = req.body;

            const { id } = req.params;

            const user = await User.findOneAndUpdate({_id: id},{
				name,
                email,
                password,
                data_nascimento,
                avatar
            },{new: true});
            
            res.status(200).json({
                user
            })
        }catch(error){
            return res.status(400).send({ error: 'Falha na edição' });
        }
    }
};