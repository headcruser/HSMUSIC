'use strict'
var express = require('express');
var api = express.Router();

var SongController = require('../controllers/song');

var md_auth = require('../middlewares/authentication');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/songs' });

// CRUD Artist
api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.get('/songs/:album?', md_auth.ensureAuth, SongController.getSongs);
api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.put('/song/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);
api.get('/getSongFile/:songFile', SongController.getSongFile);
api.post('/uploadFileSong/:id', [md_auth.ensureAuth, md_upload],
    SongController.uploadFile);
module.exports = api;