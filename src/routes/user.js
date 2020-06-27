const express = require('express');
const UserController = require('../controllers/UserController');
const LikeController = require('../controllers/LikeController');
const DislikeController = require('../controllers/DislikeController');
const LocaleController = require('../controllers/LocaleController');

const routes = express.Router();
 
routes.post('/create', UserController.create);//V
routes.post('/auth', UserController.authenticate);//V
routes.put('/update/:id', UserController.update);//V

routes.post('/:userId/likes', LikeController.store);//V
routes.post('/:userId/dislikes', DislikeController.store);//
routes.delete('/:userId/:bookId', UserController.delete);//

routes.post('/findBooks', LocaleController.find);//

routes.get('/', UserController.index);//

module.exports = routes;