import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { GLOBAL } from "../services/global";
import { UserService } from "../services/user.service";
import { Artist } from "../models/Artist";
import { AlbumService } from "../services/album.service";
import { Album } from "../models/Album";
import { UploadService } from "../services/upload.service";
@Component({
  selector: 'albumEdit',
  templateUrl: '../views/albumAdd.html',
  providers: [UserService, AlbumService,UploadService]
})

export class AlbumEditComponent implements OnInit {
  public titulo: string
  public album: Album
  public identity
  public token
  public url: string
  public alertMessage
  public is_edit

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
    private _uploadSevice: UploadService
  ) {
    this.titulo = 'Editar album'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = GLOBAL.url
    this.album = new Album('', '', 2017, '', '')
    this.is_edit = true

  }
  ngOnInit(): void {
    console.log('Album edit Component Loader...')
    this.getAlbum();
  }
  getAlbum() {
    this._route.params.forEach((params: Params) => {
      let id = params['id']
      this._albumService.getAlbum(this.token,id).subscribe(
        response => {
          if (!response.album)
            return this._router.navigate(['/'])

          return this.album = response.album
        }, error => {
          var ErrorMessage = <any>error
          if (ErrorMessage != null) {
            var body = JSON.parse(error._body)
            this.alertMessage = body.message
            console.log(error)
          }
        }
      )
    })
  }
  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let id = params['id']

      this._albumService.editAlbum(this.token,id, this.album).subscribe(
        response => {
          if (!response.album)
            return this.alertMessage = 'Error en el servidor'

          this.alertMessage = 'El album se ha creado correctamente'
          if(!this.filesToUpload){
            this._router.navigate(['/artists', response.album.artist])
          }
          else{
            this._uploadSevice.makeFileRequest(
              this.url + 'uploadImageAlbum/' + id, [], this.filesToUpload, this.token, 'image')
              .then(
                (result) => {
                  this._router.navigate(['/artists', response.album.artist])
                },
                (error) => {
                  console.log(error)
                }
              )
          }

        }, error => {
          var ErrorMessage = <any>error
          if (ErrorMessage != null) {
            var body = JSON.parse(error._body)
            this.alertMessage = body.message
            console.log(error)
          }
        }
      )
    })
  }

public filesToUpload:Array<File>
fileChangeEvent(fileInput:any){
  this.filesToUpload =<Array<File>>fileInput.target.files
}

}
