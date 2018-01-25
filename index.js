'use strict'
var mongoose=require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/hsmusic',(err,res)=>{
    if(err){
        throw err;
    }else{
         console.log("Conexion exitosa");
         app.listen(port, function(){
             console.log("Server API HSMUSIC in http://localhost:" + port);
         })
    }
});