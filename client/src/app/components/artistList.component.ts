import { Component,OnInit } from "@angular/core"
import { Router,ActivatedRoute,Params } from "@angular/router"
import { UserService } from "../services/user.service";
import { GLOBAL } from "../services/global";
import { Artist } from "../models/Artist";
import { ArtistService } from "../services/artist.service";
@Component({
  selector:'artistList',
  templateUrl:'../views/artistList.html',
  providers:[UserService,ArtistService]
})

export class ArtistListComponent implements OnInit
{
  public titulo:string
  public artists:Artist[]
  public identity
  public token
  public url:string
  public nextPage:number
  public prevPage:number

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _artistService:ArtistService
  )
  {
    this.titulo='Artistas'
    this.identity =this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = GLOBAL.url
    this.nextPage =1
    this.prevPage = 1
  }
  ngOnInit(): void {
    console.log('Artist List Component Loader...')
    this.getArtists()
  }

  getArtists()
  {
    this._route.params.forEach((params:Params)=>
    {
      let page = +params['page']
      if(!page)
        page=1
      else
      {
        this.nextPage = page + 1
        this.prevPage = page - 1

        if(this.prevPage == 0)
          this.prevPage = 1
      }
      this._artistService.getArtists(this.token,page).subscribe(
        response =>
        {
          if (!response.artists)
            return this._router.navigate(['/'])

          this.artists = response.artists
        },
        error =>
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
