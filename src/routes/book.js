const express = require('express');
const BookController = require('../controllers/BookController');


const routes = express.Router();


routes.post('/create/:userId', BookController.create);

routes.put('/:userId/:bookId', BookController.edit);


module.exports = routes;