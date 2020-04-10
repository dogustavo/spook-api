const express = require('express');
const BookController = require('../controllers/BookController');


const routes = express.Router();

routes.post('/create/:userId', BookController.create);


module.exports = routes;