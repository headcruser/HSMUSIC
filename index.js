'use strict'
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/hsmusic',(err,res)=>{
    if(err){
        throw err;
    }else{
         console.log("Conexion exitosa");
    }
});