import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { GLOBAL } from "../services/global";
import { UserService } from "../services/user.service";

import { Song } from "../models/Song";
@Component({
  selector: 'songAdd',
  templateUrl: '../views/songAdd.html',
  providers: [ UserService]
})

export class SongAddComponent implements OnInit {
  public titulo: string
  public song: Song
  public identity
  public token
  public url: string
  public alertMessage

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.titulo = 'Crear Nueva Cancion'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = GLOBAL.url
    this.song = new Song(1,'','','','')

  }
  ngOnInit(): void {
    console.log('Song Add Component Loader...')
  }

  onSubmit() {
    // this._route.params.forEach((params: Params) => {
    //   let artist_id = params['artist']
    //   this.album.artist = artist_id
    //   this._albumService.addAlbum(this.token, this.album).subscribe(
    //     response => {
    //       if (!response.album)
    //         return this.alertMessage = 'Error en el servidor'

    //       this.artist = response.artist
    //       this._router.navigate(['/editAlbum', response.album._id])
    //       return this.alertMessage = 'El album se ha creado correctamente'
    //     }, error => {
    //       var ErrorMessage = <any>error
    //       if (ErrorMessage != null) {
    //         var body = JSON.parse(error._body)
    //         this.alertMessage = body.message
    //         console.log(error)
    //       }
    //     }
    //   )
    // })
  }

}
