'use strict'

var express = require('express');

//Import controller
var userController = require('../controllers/user');
var md_auth = require('../middlewares/authentication');
var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'});
//Routers for user
api.get('/userController',md_auth.ensureAuth,userController.pruebas);
api.get('/getImageUser/:imageFile', userController.getImageFile);

api.post('/register', userController.saveUser);
api.post('/login', userController.userLogin);
api.post('/uploadImageUser/:id',
        [md_auth.ensureAuth,md_upload],
        userController.uploadImage);
api.put('/updateUser/:id', md_auth.ensureAuth,userController.updateUser);

module.exports = api;