'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
/**
 * saveArtist in databse.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function getArtist(req,res)
{
    var artisId = req.params.id;

    Artist.findById(artisId,(err,artist)=>{
        if(err)
            return res.status(500).send({ message: 'Error en la peticion'});

        if(!artist)
            return res.status(404).send({ message: 'Artista no existe' });

        res.status(200).send({ artist });
    });

}
/**
 * getArtists to Database for page.
 *
 * Default page is 1.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function getArtists(req,res){
    var page = (req.params.page)?req.params.page:1;
    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, (err,artists,total)=>{
        if(err)
            return res.status(500).send({ message: 'Error en la peticion'});

        if(!artists)
            return res.status(404).send({ message: 'No hay artistas' });

        return res.status(200).send({
            registros_totales:total,
            artists:artists,
        });
    });
}

/**
 * saveArtist in database.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function saveArtist(req, res)
{
    var artist = new Artist();
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = '';

    artist.save((err,artistStored)=>{
        if(err)
            return res.status(500).send({message:'Error al guardar Artista'});
        if(!artistStored)
            return res.status(404).send({ message: 'El artista no ha sido guardado'});

        return res.status(200).send({ artist: artistStored });
    });
}
/**
 * UpdateArtist in database.
 *
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function updateArtist(req, res)
{
    var artistId = req.params.id;
    var update = req .body;

    Artist.findByIdAndUpdate(artistId, update,(err, updateArtist)=>{
        if (err)
            return res.status(500).send({ message: 'Error al Actualizar Artista' });

        if (!updateArtist)
            return res.status(404).send({ message: 'El artista no ha sido Actualizado'});

        return res.status(200).send({ artist: updateArtist });
    });
}
/**
 * Delete Artist in databse.
 *
 * This method delete Albums and Song form Artist.
 * @param (Request)
 * @param (Response) Message
 * @return Message
 */
function deleteArtist(req, res){
    var artistId = req.params.id;
    Artist.findByIdAndRemove(artistId,(err,artistRemove)=>{
        if (err)
            return res.status(500).send({ message: 'Error al Eliminar Artista' });

        if (!updateArtist)
            return res.status(404).send({ message: 'El artista no ha sido Eliminado' });

        Album.find({ artist: artistRemove.id }).remove((err,albumRemoved)=>{
            if (err)
                return res.status(500).send({ message: 'Error al Eliminar Album de artista' });

            if (!albumRemoved)
                return res.status(404).send({ message: 'El Album del artista no pudo ser eliminado' });

            Song.find({album:albumRemoved.id}).remove((err,songDeleted)=>{
                if (err)
                    return res.status(500).send({ message: 'Error al eliminar la canción' });

                if (!songDeleted)
                    return res.status(404).send({ message: 'La cancion no pudo ser eliminada' });

                return res.status(200).send({ artist: artistRemove });
            });
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
function uploadImage(req, res)
{
    var artistID = req.params.id;
    var file_name = 'no subido..';

    if (!req.files)
        return res.status(200).send({ message: 'No has subido ninguna imagen ...'});

    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif')
    {
        Artist.findByIdAndUpdate(artistID, { image: file_name }, (err, artistUpdate) => {
            if (!artistUpdate)
                return res.status(404).send({ message: 'El Artista no pudo actualizarse' });

            res.status(200).send({ artist: artistUpdate });
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
function getImageFile(req, res)
{
    var imageFile = req.params.imageFile;
    var path_file = './uploads/artists/' + imageFile;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'La imagen no existe' });
        }
    });
}

module.exports={
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
};
