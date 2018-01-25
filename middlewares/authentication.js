'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_headcruser';

exports.ensureAuth = (req,res,next)=>{
    if(!req.headers.authorization)
        return res.status(403).send({message:'La peticion No tiene cabezera de autenticacion'});
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try {
        var payload = jwt.decode(token,secret);
        if(payload.exp<=moment.unix())
            return res.status(401).send({ message: 'Token Expirado' });
    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'Token invalido' });
    }
    req.user=payload;
    next();
};