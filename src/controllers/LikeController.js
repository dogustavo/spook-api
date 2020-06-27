const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { userId } = req.params;

        const loggedUser = await User.findById(user);
        const targetUser = await User.findById(userId);
        
        console.log({
            usuario_logado: loggedUser,
            usuario_alvo: targetUser
        })


        if(!targetUser) {
            return res.status(400).send({ error: 'Livro não existe' });
        }

        if(loggedUser.likes.includes(targetUser._id)) {
            targetUser.likes.push(loggedUser._id);
            await targetUser.save();
            return res.status(200).send({ match: true });
        }

        targetUser.likes.push(loggedUser._id);

        await targetUser.save();

        return res.json(targetUser);
        
    }
}

