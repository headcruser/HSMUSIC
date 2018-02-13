'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

// Test Method
function pruebas(req,res){
    res.status(200).send({
        message:'Action Controller user'
    });
}

// Register User
function saveUser(req,res)
{
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    //user.role = 'ROLE_ADMIN';
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

// Autentication User
function userLogin(req,res)
{
    var params = req.body;
    var email=params.email;
    var password = params.password;

    User.findOne({email:email},(err,user)=> {
        if (err)
            return res.status(500).send({ message: 'Error peticion' });

        if (!user)
            return res.status(404).send({ message: 'El usuario no existe'});

        bcrypt.compare(password,user.password,(err,check)=>{
            if (!check)
                return res.status(404).send({ message: 'Los datos son incorrectos' });

            if(!params.gethash)
                return res.status(200).send({user});

            res.status(200).send({ token: jwt.createToken(user) });
        });
    });
}

// Update User
function updateUser(req,res){
    var userID = req.params.id;
    var update = req.body;

    if(userID != req.user.sub)
    {
        return res.status(500).send(
            { message: 'No tienes Permiso para actualizar el usuario' });
    }

    User.findByIdAndUpdate(userID,update,(err,userUpdated)=>{
        if(err)
            return res.status(500).send({ message:'Error al actualizar el usuario'});
        if(!userUpdated)
            return res.status(404).send({ message: 'El usuario no ha podido logearse'});

        res.status(200).send({ user: userUpdated });
    });
}

function uploadImage(req,res){
    var userID= req.params.id;
    var file_name = 'no subido..';

    if(!req.files)
        return res.status(200).send({ message: 'No has subido ninguna imagen ...'});

    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext =='png' || file_ext =='jpg' || file_ext == 'gif')
    {
        User.findByIdAndUpdate(userID, { image: file_name }, (err, userUpdated) => {
            if (!userUpdated)
                return res.status(404).send({ message: 'El Usuario no pudo actualizarse' });

            res.status(200).send({ image:file_name, user: userUpdated });
        });
    }else{
        return res.status(200).send({ message: 'La extension no valida...' });
    }
}

function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file ='./uploads/users/'+imageFile;
    fs.exists(path_file,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'La imagen no existe'});
        }
    });
}
module.exports={
    pruebas,
    saveUser,
    userLogin,
    updateUser,
    uploadImage,
    getImageFile
};