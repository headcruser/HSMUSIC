'use strict'

var express = require('express');

//Import controller
var userController = require('../controllers/user');

var api = express.Router();
api.get('/userController',userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.userLogin);

module.exports = api;
