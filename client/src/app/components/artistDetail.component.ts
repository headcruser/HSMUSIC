import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { GLOBAL } from "../services/global";

import { Artist } from "../models/Artist";
import { Album } from "../models/Album";
import { ArtistService } from "../services/artist.service";
import { AlbumService } from "../services/album.service";
import { UserService } from "../services/user.service";
import { UploadService } from "../services/upload.service";
@Component({
  selector: 'artistDetail',
  templateUrl: '../views/artistDetail.html',
  providers: [ArtistService, UploadService,AlbumService]
})

export class ArtistDetailComponent implements OnInit
{
  public identity
  public token
  public url: string
  public artist: Artist
  public albums: Album[]
  public alertMessage

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _albumService : AlbumService
  ) {
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = GLOBAL.url
  }
  ngOnInit(){
    this.getArtist()
  }
  getArtist()
  {
    this._route.params.forEach((params:Params)=>
    {
      let id = params['id']

      this._artistService.getArtist(this.token, id).subscribe(
        response=>
        {
          if (!response.artist){
            return this._router.navigate(['/'])
          }

          this.artist = response.artist

          this._albumService.getAlbums(this.token,response.artist._id ).subscribe(
            response=>{
              if(!response.albums){
                return this.alertMessage = 'El artista no tiene albums'
              }
              this.albums = response.albums;
            },
            error => {
              var ErrorMessage = <any>error
              if (ErrorMessage != null) {
                var body = JSON.parse(error._body)
                console.log(error)
              }
            }
          )

        },
        error=>
        {
          var ErrorMessage = <any>error
          if (ErrorMessage != null)
          {
            var body = JSON.parse(error._body)
            console.log(error)
          }
        }
      )
    })
  }
  public confirmado;
  onDeleteConfirm(id){
    this.confirmado = id;
  }
  onCancelAlbum(){
    this.confirmado = null;
  }
  onDeleteAlbum(id){
    this._albumService.deleteAlbum(this.token,id).subscribe(
      response => {
        if (!response.album) {
          return alert('Error en el servidor')
        }
        this.getArtist()
      },
      error => {
        var ErrorMessage = <any>error
        if (ErrorMessage != null) {
          var body = JSON.parse(error._body)
          console.log(error)
        }
      }
    )
  }

}
