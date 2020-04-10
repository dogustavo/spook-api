const express = require('express');
const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');


const routes = express.Router();

 
//User routes
routes.post('/api/user/auth', UserController.create);

routes.post('/api/:userId/book', BookController.create);


module.exports = routes;