const express = require('express');
const UserController = require('../controllers/UserController');

const routes = express.Router();
 
routes.post('/create', UserController.create);
routes.post('/auth', UserController.authenticate);

module.exports = routes;