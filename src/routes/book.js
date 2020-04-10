const express = require('express');
const BookController = require('../controllers/BookController');


const routes = express.Router();

routes.post('/:userId', BookController.create);


module.exports = routes;