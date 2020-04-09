/*
* 
  request.query X
  request.body X
  request.params X
*/




module.exports = {
  async store (request, response){
    const alisson = request.query;

  },

  async bow (request, response){
    const { nome, condicao, foto, descricao, autor, editora } = request.body;
  },

  async put (request, response){
    
  },

  async put (request, response){
    const alisson = request.params;
  }
}