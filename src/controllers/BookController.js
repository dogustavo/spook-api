const User = require('../models/User');

module.exports = {
  async create(req, res) {

    const { 
		bookImage,
		nameBook,
		description,
		status,
		autor, 
		editora
    } = req.body;

    const book = User.create({
		bookImage,
		nameBook,
		description,
		status,
		autor, 
		editora
    });

    return res.status(200).json({book})
  },

}