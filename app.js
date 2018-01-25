'use strict'
var express = require('express');
var bodyParse = require('body-parser');

var app = express();

//Loader Routers
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json()); //Convert object to json

//Config Headers http

//Base Routes
app.get('/pruebas',function(req,res){
    res.status(200).send({message:'Bienvenido'});
});
module.exports = app; //Export Modules