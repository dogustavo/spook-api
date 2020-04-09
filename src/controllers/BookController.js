const Book = require("../models/Book");

module.exports = {
  async store (req, res){
    const { nome, condicao, foto, descricao, autor, editora } = req.body;
    
    const qtd = await Book.find(bo => bo);
    if(qtd !== []){
      return res.status(204).json({entro: "Não"});
    } 
    console.log(Book);

    
    const BookNew = Book.create({
      bookImage: foto,
      nameBook: nome,
      description: descricao,
      condiction: condicao,
      autor, 
      editora
    });
    return res.status(200).json({BookNew})
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