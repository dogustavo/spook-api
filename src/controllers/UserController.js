const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: '30 days',
    });
}

module.exports = {
    async index(req, res) {
        const { user } = req.headers;
        const { lng, lat, distance } = req.query;
        
        const loggedUser = await User.findById(user);

        const users = await User.aggregate([{
            $geoNear: {
                near: { type: "point", coordinates: [ parseFloat(lng), parseFloat(lat) ] },
                distanceField: "dist.calculated",
                maxDistance: parseFloat(distance),
                spherical: true,
                $and: [
                    { _id: { $ne: user } },
                    { _id: { $nin: loggedUser.likes } },
                    { _id: { $nin: loggedUser.dislikes } }
                ]
            }
        }]);


        res.send({users})
    },

    async create(req, res) {
        try {
            const { 
                name,
                email,
                password,
                data_nascimento,
                avatar,
				likes,
                deslikes,
                geometry
            } = req.body;
    
            if(await User.findOne({ email })) {
                return res.status(400).send({ error: 'Este email já está sendo utilizado' });
            }

            let newUser = new User(); 

            newUser.name = name, 
            newUser.email = email 
            newUser.data_nascimento = data_nascimento
            newUser.avatar = avatar
            newUser.likes = likes
            newUser.deslikes = deslikes
            newUser.geometry = geometry
            newUser.setPassword(password); 

            newUser.save();

            return res.json(newUser);

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

        if(!await user.validPassword(password)){
            return res.status(400).send({ error: 'Senha inválida' });
        }
        
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