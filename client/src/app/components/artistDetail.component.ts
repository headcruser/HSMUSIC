import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { GLOBAL } from "../services/global";

import { Artist } from "../models/Artist";
import { ArtistService } from "../services/artist.service";
import { UserService } from "../services/user.service";
import { UploadService } from "../services/upload.service";
@Component({
  selector: 'artistDetail',
  templateUrl: '../views/artistDetail.html',
  providers: [ArtistService, UploadService]
})

export class ArtistDetailComponent implements OnInit
{
  public identity
  public token
  public url: string
  public artist: Artist
  public alertMessage

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
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

          //Get Albums
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

}
