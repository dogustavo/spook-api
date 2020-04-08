const express = require('express');
const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');


const routes = express.Router();


//User routes
routes.get('/user');


//Book routes
routes.get('/book', BookController.index);

routes.post('/book', BookController.bow);

routes.put('/book/:id', BookController.put);

routes.delete('/book/:id', BookController.delete);


module.exports = routes; 