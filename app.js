'use strict'

//Instance Librarys
var express = require('express');
var bodyParse = require('body-parser');
var app = express();

//Create user routes
var user_routes = require('./routes/user');

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json()); //Convert object to json

//Config Headers http

//Base Routes loader
app.use('/api', user_routes);

module.exports = app; //Export Modules