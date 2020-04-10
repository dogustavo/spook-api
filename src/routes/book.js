const express = require('express');
const BookController = require('../controllers/BookController');


const routes = express.Router();


routes.post('/create/:userId', BookController.create);

routes.put('/:userId/:bookId', BookController.edit);

routes.delete('/:userId/:bookId', BookController.delete);


module.exports = routes;