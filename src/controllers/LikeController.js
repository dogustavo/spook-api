const Book = require('../models/Book');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        // console.log('user que recebeu like:', req.params.userId);
        // console.log('User deu like:', req.headers.user);

        const { user } = req.headers;
        const { userId } = req.params;

        console.log(bookId);
        

        const loggedUser = await User.findById(user);
        const targetUser = await Book.findById(userId);


        if(!targetBook) {
            return res.status(400).send({error: 'Livro não existe'});
        }

        targetBook.likes.push(targetBook._id);

        await targetBook.save();
        
        return res.json(targetBook);
        
    }
}