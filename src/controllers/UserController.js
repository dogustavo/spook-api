const User = require('../models/User');

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
        
    }
};