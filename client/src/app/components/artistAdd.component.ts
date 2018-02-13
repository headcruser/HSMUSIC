import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { UserService } from "../services/user.service";
import { GLOBAL } from "../services/global";
import { Artist } from "../models/Artist";
@Component({
  selector: 'artistAdd',
  templateUrl: '../views/artistAdd.html',
  providers: [UserService]
})

export class ArtistAddComponent implements OnInit {
  public titulo: string
  public identity
  public token
  public url: string
  public artist:Artist

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
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

}
