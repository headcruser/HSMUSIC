'use strict'

var express = require('express');

//Import controller
var userController = require('../controllers/user');
var md_auth = require('../middlewares/authentication');
var api = express.Router();

//Routers for user
api.get('/userController',md_auth.ensureAuth,userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.userLogin);
api.put('/updateUser/:id', md_auth.ensureAuth,userController.updateUser);

module.exports = api;
