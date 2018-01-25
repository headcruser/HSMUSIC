'use strict'

var express = require('express');

//Import controller
var userController = require('../controllers/user');

var api = express.Router();
api.get('/userController',userController.pruebas);

module.exports = api;
