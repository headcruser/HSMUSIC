'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
/**
 * getArtist in databse.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function getAlbum(req, res) {
    var albumId = req.params.id;

    Album.findById(albumId).populate({path:'artist'}).exec((err,album)=>{
        if (err)
            return res.status(500).send({ message: 'Error en la peticion' });

        if (!album)
            return res.status(404).send({ message: 'El Album no existe' });

        return res.status(200).send({ album });
    });
}
/**
 * getAlbums to Database for page.
 *
 * Default page is 1.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function getAlbums(req, res) {
   var artistID = req.params.artist;
    if(!artistID){
        var find = Album.find({}).sort('title');
    }else{
        var find = Album.find({ artist:artistID}).sort('year');
    }
    find.populate({path:'artist'}).exec((err,albums)=>{
        if (err)
            return res.status(500).send({ message: 'Error en la peticion' });

        if (!albums)
            return res.status(404).send({ message: 'No hay albums' });

        return res.status(200).send({ albums });
    });

}
/**
 * saveAlbum in database.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function saveAlbum(req, res)
{
    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) => {
        if (err)
            return res.status(500).send({ message: 'Error en la peticion' });

        if (!albumStored)
            return res.status(404).send({ message: 'El Album no ha sido guardado' });

        return res.status(200).send({ album: albumStored });
    });
}
/**
 * Update Album in database.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function updateAlbum(req, res)
{
    var albumID = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumID,update,(err,albumUpdated)=>{
        if (err)
            return res.status(500).send({ message: 'Error en la peticion' });

        if (!albumUpdated)
            return res.status(404).send({ message: 'El Album no Existe' });

        return res.status(200).send({ album: albumUpdated });
    });
}
/**
 * Delete Album in database.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function deleteAlbum(req, res)
{
    var albumID = req.params.id;

    Album.findByIdAndRemove( albumID,(err, albumRemoved) => {
        if (err)
            return res.status(500).send({ message: 'Error de peticion Album' });

        if (!albumRemoved)
            return res.status(404).send({ message: 'El Album no pudo ser eliminado' });

        Song.find({ album: albumRemoved.id }).remove((err, songDeleted) => {
            if (err)
                return res.status(500).send({ message: 'Error al eliminar la canción' });

            if (!songDeleted)
                return res.status(404).send({ message: 'La cancion no pudo ser eliminada' });

            return res.status(200).send({ album: albumRemoved });
        });
    });
}
/**
 * Upload image Artist in databse.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function uploadImage(req, res) {
    var albumID = req.params.id;
    var file_name = 'no subido..';

    if (!req.files)
        return res.status(200).send({ message: 'No has subido ninguna imagen ...' });

    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif')
    {
        Album.findByIdAndUpdate(albumID, { image: file_name }, (err, albumUpdate) => {
            if (!albumUpdate)
                return res.status(404).send({ message: 'El Album no pudo actualizarse'});

            res.status(200).send({ album: albumUpdate });
        });
    } else {
        return res.status(200).send({ message: 'La extension no valida...' });
    }
}
/**
 * Get image Artist.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/albums/'+imageFile;
    fs.exists(path_file, (exists) => {
        if (!exists)
            return res.status(200).send({ message: 'La imagen no existe' });

        return res.sendFile(path.resolve(path_file));
    });
}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
};
