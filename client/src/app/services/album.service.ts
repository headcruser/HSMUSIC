import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global'
import { Album } from "../models/Album"

@Injectable()
export class AlbumService {
  public url: string

  constructor(private _http: Http) {
    this.url = GLOBAL.url
  }
  getAlbum(token,id:string){
    let headers = this.buildHeader(token)
    let options = new RequestOptions({headers:headers})
    return this._http.get(this.url+'album/'+id,options)
      .map(res=>res.json())
  }
  getAlbums(token,artistID){
    let headers = this.buildHeader(token)
    let options = new RequestOptions({ headers: headers })

    if(artistID == null)
    {
      return this._http.get(this.url + 'albums', options)
        .map(res => res.json())
    }else{
      return this._http.get(this.url + 'albums/'+artistID, options)
        .map(res => res.json())
    }
  }
  addAlbum(token: string, album: Album) {
    let params = JSON.stringify(album)
    let headers = this.buildHeader(token)
    return this._http.post( this.url + 'album', params, { headers: headers })
        .map(res => res.json());
  }
  editAlbum(token: string, id:string,  album: Album) {
    let params = JSON.stringify(album)
    let headers = this.buildHeader(token)
    return this._http.put(this.url + 'album/'+id, params, { headers: headers })
      .map(res => res.json());
  }

  deleteAlbum(token, id: string) {
    let headers = this.buildHeader(token)
    let options = new RequestOptions({ headers: headers })
    return this._http.delete(this.url + 'album/' + id, options)
      .map(res => res.json())
  }

  buildHeader(token: string): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
  }

}
