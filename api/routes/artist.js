'use strict'
var express = require('express');
var ArtistController = require('../controllers/artist');
var api = express.Router();
var md_auth = require('../middlewares/authentication');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/artists' });

// CRUD Artist
api.get('/artist/:id',md_auth.ensureAuth,ArtistController.getArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);
api.get('/getImageArtist/:imageFile', ArtistController.getImageFile);

api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
api.post('/uploadImageArtist/:id', [md_auth.ensureAuth, md_upload],
    ArtistController.uploadImage);

api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);

module.exports= api;