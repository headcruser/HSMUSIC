import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { GLOBAL } from "../services/global";

import { Artist } from "../models/Artist";
import { ArtistService } from "../services/artist.service";
import { UserService } from "../services/user.service";
import { UploadService } from "../services/upload.service";
@Component({
  selector: 'artistEdit',
  templateUrl: '../views/artistAdd.html',
  providers: [ArtistService, UserService, UploadService]
})

export class ArtistEditComponent implements OnInit
{
  public titulo: string
  public identity
  public token
  public url: string
  public artist: Artist
  public alertMessage
  public is_edit

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _uploadSevice: UploadService
  ) {
    this.titulo = 'Editar'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = GLOBAL.url
    this.artist = new Artist("", "", "")
    this.is_edit = true
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

  onSubmit()
  {
    this._route.params.forEach((params: Params) =>
    {
      let id = params['id']

      this._artistService.updateArtist(this.token, id, this.artist).subscribe(
        response =>
        {
          if (!response.artist)
            return this.alertMessage = 'Error en el servidor'

          if(!this.filesToUpload)
            return this._router.navigate(['/artist', response.artist._id])

          this._uploadSevice.makeFileRequest(
            this.url+'uploadImageArtist/'+id, [], this.filesToUpload, this.token, 'image')
            .then(
              (result)=>
              {
                this._router.navigate(['/artist', response.artist._id])
              },
              (error)=>
              {
                console.log(error)
              }
            )
          return this.alertMessage = 'El artista se ha Actualizado correctamente'
        }, error =>
        {
          var ErrorMessage = <any>error
          if (ErrorMessage != null)
          {
            var body = JSON.parse(error._body)
            this.alertMessage = body.message
            console.log(error)
          }
        }
      )
    })

  }

  public filesToUpload: Array<File>
  /**
   *
   */
  public fileChangeEvent(fileInput:any)
  {
    this.filesToUpload = <Array<File>>fileInput.target.files

  }
}
