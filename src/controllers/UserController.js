// const bcrypt = require('bcryptjs');
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

            let newUser = new User(); 

            newUser.name = req.body.name, 
            newUser.email = req.body.email 
            newUser.data_nascimento = req.body.data_nascimento
            newUser.avatar = req.body.avatar
            newUser.likes = req.body.likes
            newUser.deslikes = req.body.deslikes
            newUser.setPassword(req.body.password); 

            newUser.save((err, User) => { 
                if (err) { 
                    return res.status(400).send({ 
                        message : "Falha ao cadastrar usuário."
                    }); 
                } 
                else { 
                    return res.status(200).send({ 
                        message : "Usuário cadastrado com sucesso."
                    }); 
                } 
            }); 
        } catch (error) {
            // return res.status(400).send({ error: 'Falha no cadastro' });
        }
        
    },

    async authenticate(req, res) {
        const { email, password } = req.body;

        // const user = await User.findOne({ email }).select('+password');

        // if(!user) {
        //     return res.status(400).send({ error: 'Usuário não encontrado' });
        // }

        // if(!await bcrypt.compare(password, user.password)){
        //     return res.status(400).send({ error: 'Senha inválida' });
        // }

        // user.password = undefined;

        User.findOne({ email}, function(err, user){
            if(user === null){
                return res.status(400).send({
                    message: "User not found"
                });
            }
            if(user.validPassword(password)){
                return res.status(201).send({
                    message: "User Logged In"
                })
            }else{
                return res.status(400).send({
                    message: "Wrong Password"
                })
            }
        })


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
    },


    async delete(req, res){
        try{
            const { userId } = req.params;

            const user = await User.findOneAndRemove({_id: userId});
            
            res.status(204).send({});

        } catch(error){

            return res.status(400).send({ error: 'Falha na exclusão de usuário' });

        }



    }

};