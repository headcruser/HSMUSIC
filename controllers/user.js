'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function pruebas(req,res){
    res.status(200).send({
        message:'Action Controller user'
    });
}
function saveUser(req,res)
{
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if(!params.password){
        return res.status(200).send({message:'Introduce la contraseña'});
    }

    bcrypt.hash(params.password, null, null, function (err, hash)
    {
        user.password = hash;

        if (user.name == null && user.surname == null && user.email == null) {
            return res.status(200).send({ message: 'Rellena todos los campos' });
        }
        user.save((err, userStored) => {
            if (err) {
               return res.status(500).send({ message: 'Error al guardar el usuario' });
            }
            if (!userStored) {
                return res.status(404).send({ message: 'No se Registro usuario' });
            }

            res.status(200).send({ user: userStored });
        });
    });
}
module.exports={
    pruebas,
    saveUser
};