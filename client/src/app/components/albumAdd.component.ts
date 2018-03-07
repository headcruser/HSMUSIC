import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { GLOBAL } from "../services/global";
import { UserService } from "../services/user.service";
import { Artist } from "../models/Artist";
import { ArtistService } from "../services/artist.service";
import { AlbumService } from "../services/album.service";
import { Album } from "../models/Album";
@Component({
  selector: 'albumAdd',
  templateUrl: '../views/albumAdd.html',
  providers: [ArtistService, UserService, AlbumService]
})

export class AlbumAddComponent implements OnInit
{
  public titulo: string
  public artist: Artist
  public album: Album
  public identity
  public token
  public url: string
  public alertMessage

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _albumService: AlbumService
  ) {
    this.titulo = 'Crear Nuevo Album'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = GLOBAL.url
    this.album = new Album('','',2017,'','')

  }
  ngOnInit(): void {
    console.log('Album Add Component Loader...')
  }

  onSubmit()
  {
    this._route.params.forEach((params:Params)=>{
      let artist_id = params['artist']
      this.album.artist=artist_id
      this._albumService.addAlbum(this.token,this.album).subscribe(
        response => {
          if (!response.album)
            return this.alertMessage = 'Error en el servidor'

          this.artist = response.artist
          this._router.navigate(['/editAlbum', response.album._id])
          return this.alertMessage = 'El album se ha creado correctamente'
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

}
