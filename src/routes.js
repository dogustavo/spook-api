const express = require('express');
const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');


const routes = express.Router();

 
//User routes
routes.post('/user', UserController.store);


//Book routes
routes.post('/book', BookController.store);


module.exports = routes; 