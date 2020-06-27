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
    
        loggedUser.dislikes.push(targetUser._id);
        
        await loggedUser.save();

        return res.json(loggedUser);
        
    }
    
    // console.log(targetUser.likes);


    // loggedUser.dislikes.push(targetUser._id);
    
    // await loggedUser.save();
}

