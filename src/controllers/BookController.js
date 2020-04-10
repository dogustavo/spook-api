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
	
	async edit(req, res) {
		
    	const { 
					bookImage,
					nameBook,
					description,
					condition,
					autor, 
					editora
			} = req.body;
			
			const book = await Book.findOneAndRemove(
				{ _id : req.params.bookId}
			);

			const user = await User.findOneAndUpdate({ _id : req.params.userId}, {
				book
			}, { new: true });		
			
			const book2 = await Book.create({
				bookImage,
				nameBook,
				description,
				condition,
				autor, 
				editora
			});
			
			const user2 = await User.findOneAndUpdate({ _id: req.params.userId }, {
				book: {
					bookImage,
					nameBook,
					description,
					condition,
					autor, 
					editora
				} 
			}, { new: true });
		
				return res.status(200).json({book2, user2})
	}
}
