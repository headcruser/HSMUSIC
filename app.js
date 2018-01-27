'use strict'

//Instance Librarys
var express = require('express');
var bodyParse = require('body-parser');
var app = express();

//Create user routes
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json()); //Convert object to json

//Config Headers http
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);

module.exports = app; //Export Modules