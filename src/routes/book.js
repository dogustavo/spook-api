const express = require('express');
const BookController = require('../controllers/BookController');


const routes = express.Router();

routes.post('/:userId', BookController.create);

routes.put('/:userId/:bookId', BookController.edit);


module.exports = routes;