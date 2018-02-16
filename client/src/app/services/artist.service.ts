import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global'
import { Artist } from "../models/Artist"

@Injectable()
export class ArtistService
{
  public url:string

  constructor(private _http:Http)
  {
    this.url=GLOBAL.url
  }
  addArtist(token:string,artist:Artist)
  {
    let params = JSON.stringify(artist)
    let headers = this.buildHeader(token)
    return this._http.post(
      this.url + 'artist',
      params, { headers: headers })
      .map(res => res.json());
  }

  getArtists(token,page)
  {
    let headers = this.buildHeader(token)
    let options = new RequestOptions({ headers: headers })
    return this._http.get(this.url + 'artists/' + page, options)
      .map(res => res.json())
  }

  getArtist(token,id:string)
  {
    let headers = this.buildHeader(token)

    let options = new RequestOptions({ headers: headers })
    return this._http.get(this.url + 'artist/' + id, options)
      .map(res => res.json())
  }

  updateArtist(token, id: string,artist:Artist)
  {
    let params = JSON.stringify(artist)
    let headers = this.buildHeader(token)
    return this._http.put(this.url + 'artist/' + id, params,{headers:headers})
      .map(res => res.json())
  }

  deleteArtist(token,id:string)
  {
    let headers = this.buildHeader(token)
    let options = new RequestOptions({headers:headers})

    return this._http.delete(this.url+'artist/'+id,options)
                      .map(res=>res.json())
  }

  buildHeader(token:string):Headers
  {
    return new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
  }

}
