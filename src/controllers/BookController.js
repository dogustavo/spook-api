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
			book: book
		}, { new: true });

    	return res.status(200).json({book, user})
	},
	
	async edit(req, res) {

			const {
				userId, bookId
			}= req.params

			
    	const { 
				bookImage,
				nameBook,
				description,
				condition,
				autor, 
				editora
			} = req.body;
			
			const book = await Book.findOneAndRemove({_id: bookId});
			
			const user = await User.findOneAndUpdate({_id: userId},{
				book: book
			},{new: true});		
			
			const book2 = await Book.create({
				bookImage,
				nameBook,
				description,
				condition,
				autor, 
				editora
			});
			
			const user2 = await User.findOneAndUpdate({ _id: userId }, {
				book: book2
			}, { new: true });
		
		return res.status(200).json({book2, user2})
	},

	async delete(req, res){
			const {
				userId, bookId
			}= req.params

			const book = await Book.findOneAndRemove({_id: bookId});

			const user = await User.findOneAndUpdate({_id: userId},{
				book: book
			},{new: true});

			return res.status(204).json({book});
	}
}





