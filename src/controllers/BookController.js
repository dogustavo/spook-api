const Book = require('../models/Book');
const User = require('../models/User');

module.exports = {
  async create(req, res) {

    const { 
		bookImage,
		nameBook,
		description,
		condition,
		autor, 
		editora
    } = req.body;

    const book = await Book.create({
		bookImage,
		nameBook,
		description,
		condition,
		autor, 
		editora
	});
	
	const user = await User.findOneAndUpdate({ _id: req.params.userId }, {
		book: {
			bookImage,
			nameBook,
			description,
			condition,
			autor, 
			editora
		} 
	}, { new: true });

    return res.status(200).json({book, user})
  },


}

