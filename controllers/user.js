'use strict'

function pruebas(req,res){
    res.status(200).send({
        message:'Action Controller user'
    });
}
module.exports={
    pruebas
};