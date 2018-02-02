'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

/**
 * getSong in databse.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function getSong(req, res)
{
    var songId = req.params.id;
    Song.findById(songId).populate({path:'album'}).exec((err,song)=>{
        if (err)
            return res.status(500).send({ message: 'Error en la peticion' });

        if (!song)
            return res.status(404).send({ message: 'La cancion no existe' });

        return res.status(200).send({ song });
    });
}
/**
 * getSongs in databse.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function getSongs(req, res){
    var albumID = req.params.album
    if(!albumID){
        var find = Song.find({}).sort('number')
    }else{
        var find = Song.find({ album: albumID }).sort('number')
    }
    find.populate({
        path:'album',
        populate : {
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err,songs)=>{
        if (err)
            return res.status(500).send({ message: 'Error en la peticion' });

        if (!songs)
            return res.status(404).send({ message: 'No hay canciones' });

        return res.status(200).send({ songs });
    })
}
/**
 * Save Song in databse.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function saveSong(req ,res)
{
    var song = new Song();
    var params = req.body;

    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;
    song.save((err,songStored)=>{
        if(err)
            return res.status(500).send({ message: 'Error en el servidor' });

        if(!songStored)
            return res.status(404).send({ message: 'No se ha guardado la cancion' });

        return res.status(200).send({ song: songStored });
    });

}
/**
 * update Song in databse.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function updateSong(req, res)
{
    var songId = req.params.id
    var update = req.body

    Song.findByIdAndUpdate(songId,update,(err,songUpdated)=>{
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });

        if (!songUpdated)
            return res.status(404).send({ message: 'No se pudo actualizar la cancion' });

        return res.status(200).send({ song: songUpdated });
    })
}
/**
 * Delete Song in databse.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function deleteSong(req, res)
{
    var songID = req.params.id;
    Song.findByIdAndRemove(songID, (err, songRemoved) => {
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });

        if (!songRemoved)
            return res.status(404).send({ message: 'No se pudo Eliminar la cancion' });

        return res.status(200).send({ song: songRemoved });
    })
}
/**
 * Upload File Song in databse.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function uploadFile(req, res)
{
    var songID = req.params.id;
    var file_name = 'no subido..';

    if (!req.files)
        return res.status(200).send({ message: 'No has subido ninguna imagen ...' });

    var file_path = req.files.file.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if (file_ext == 'mp3' || file_ext == 'ogg') {
        Song.findByIdAndUpdate(songID, { file: file_name }, (err, songUpdate) => {
            if (!songUpdate)
                return res.status(404).send({ message: 'La canción no pudo actualizarse' });

            res.status(200).send({ song: songUpdate });
        });
    } else {
        return res.status(200).send({ message: 'La extension no valida...' });
    }
}
/**
 * Get Song File Artist.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function getSongFile(req, res) {
    var songFile = req.params.songFile
    var path_file = './uploads/songs/' + songFile

    fs.exists(path_file, (exists) => {
        if (!exists)
            return res.status(200).send({ message: 'La canción no existe' })

        return res.sendFile(path.resolve(path_file))
    })
}

module.exports = {
    getSong,
    getSongs,
    saveSong,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
};
