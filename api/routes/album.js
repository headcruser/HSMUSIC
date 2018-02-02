'use strict'
var express = require('express');
var api = express.Router();

var AlbumController = require('../controllers/album');

var md_auth = require('../middlewares/authentication');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/albums' });

// CRUD Artist
api.get('/album/:id', md_auth.ensureAuth,AlbumController.getAlbum);
api.get('/albums/:artist?', md_auth.ensureAuth, AlbumController.getAlbums);
api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum);
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
api.get('/getImageAlbum/:imageFile', AlbumController.getImageFile);
api.post('/uploadImageAlbum/:id', [md_auth.ensureAuth, md_upload],
    AlbumController.uploadImage);

module.exports = api;
