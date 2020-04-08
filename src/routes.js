const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

 
//User routes
routes.post('/user', UserController.store);


//Book routes

module.exports = routes; 