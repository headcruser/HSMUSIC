import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { GLOBAL } from "../services/global";

import { Artist } from "../models/Artist";
import { ArtistService } from "../services/artist.service";
import { UserService } from "../services/user.service";
@Component({
  selector: 'artistAdd',
  templateUrl: '../views/artistAdd.html',
  providers: [ArtistService,UserService]
})

export class ArtistAddComponent implements OnInit {
  public titulo: string
  public identity
  public token
  public url: string
  public artist:Artist
  public alertMessage

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService:ArtistService
  ) {
    this.titulo = 'Crear nuevo artista'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = GLOBAL.url
    this.artist = new Artist("","","")
  }
  ngOnInit(): void {
    console.log('Artist Add Component Loader...')
  }

  onSubmit()
  {
    this._artistService.addArtist(this.token, this.artist).subscribe(
      response=>
      {
        if(!response.artist)
          return this.alertMessage='Error en el servidor'

        this.artist = response.artist
        this._router.navigate(['/editArtist',response.artist._id])
        return this.alertMessage = 'El artista se ha creado correctamente'
      },error=>
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
  }

}
