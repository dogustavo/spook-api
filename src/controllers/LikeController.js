const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { userId } = req.params;

        const loggedUser = await User.findById(user);
        const targetUser = await User.findById(userId);
        
        if(!targetUser) {
            return res.status(400).send({ error: 'Livro não existe' });
        }

        if(targetUser.likes.includes(loggedUser._id)) {
            console.log('DEU MATCH');
            
        }

        loggedUser.likes.push(targetUser._id);
        
        await loggedUser.save();

        return res.json(loggedUser);
        
    }
}

