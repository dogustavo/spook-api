const express = require('express');
const UserController = require('../controllers/UserController');
const LikeController = require('../controllers/LikeController');

const routes = express.Router();
 
routes.post('/create', UserController.create);
routes.post('/auth', UserController.authenticate);
routes.put('/update/:id', UserController.update);

routes.post('/:userId/likes', LikeController.store);
routes.delete('/:userId', UserController.delete);

module.exports = routes;