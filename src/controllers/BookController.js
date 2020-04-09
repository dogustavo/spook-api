const User = require('../models/User');

module.exports = {
  async store (req, res){

    const { 
		bookImage,
		nameBook,
		description,
		status,
		autor, 
		editora
    } = req.body;

    const qtd = await User.find(bo => bo);
    
    if(qtd.length != 0){
		return res.status(204).json([]);
    } 

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


  async index (req, res){
    const alisson = request.query;

  },


  async put (request, response){
    
  },

  async put (request, response){
    const alisson = request.params;
  }
}