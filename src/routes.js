const express = require('express');
const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');


const routes = express.Router();

 
//User routes
routes.post('/user', UserController.store);


//Book routes
routes.post('/book/:id', BookController.store);


// routes.get('/book', BookController.index);


// routes.put('/book/:id', BookController.put);

// routes.delete('/book/:id', BookController.delete);


module.exports = routes; 