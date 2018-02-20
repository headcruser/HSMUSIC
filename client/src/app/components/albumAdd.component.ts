import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { GLOBAL } from "../services/global";
import { UserService } from "../services/user.service";
import { Artist } from "../models/Artist";
import { ArtistService } from "../services/artist.service";
import { Album } from "../models/Album";
@Component({
  selector: 'albumAdd',
  templateUrl: '../views/albumAdd.html',
  providers: [ArtistService, UserService]
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
    private _artistService: ArtistService
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



}
