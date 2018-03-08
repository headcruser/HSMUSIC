import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { GLOBAL } from "../services/global";
import { Album } from "../models/Album";
import { AlbumService } from "../services/album.service";
import { UserService } from "../services/user.service";
import { UploadService } from "../services/upload.service";
@Component({
  selector: 'albumDetail',
  templateUrl: '../views/albumDetail.html',
  providers: [UploadService, AlbumService]
})

export class AlbumDetailComponent implements OnInit {
  public identity
  public token
  public url: string
  public album: Album
  public alertMessage

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService
  ) {
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = GLOBAL.url
  }
  ngOnInit() {
    console.log('album detail component')
    //get album
    this.getAlbum()
  }
  getAlbum() {

    this._route.params.forEach((params: Params) => {
      let id = params['id']

      this._albumService.getAlbum(this.token, id).subscribe(
        response => {
          if (!response.album) {
            return this._router.navigate(['/'])
          }

          this.album = response.album

          // this._albumService.getAlbums(this.token, response.artist._id).subscribe(
          //   response => {
          //     if (!response.albums) {
          //       return this.alertMessage = 'El artista no tiene albums'
          //     }
          //     this.albums = response.albums;
          //   },
          //   error => {
          //     var ErrorMessage = <any>error
          //     if (ErrorMessage != null) {
          //       var body = JSON.parse(error._body)
          //       console.log(error)
          //     }
          //   }
          // )

        },
        error => {
          var ErrorMessage = <any>error
          if (ErrorMessage != null) {
            var body = JSON.parse(error._body)
            console.log(error)
          }
        }
      )
    })
  }

}
