import {Injectable} from '@angular/core'
import {HttpClient,HttpHeaders} from '@angular/common/http'

import {GLOBAL} from './global'
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn:'root'
})
export class UserService
{
  public url:string;
  public identity:string;
  public token:string;

  constructor(private _http:HttpClient){
    this.url= GLOBAL.url
  }
  /**
   * Login User application
   * @param userToLogin Object User
   * @param gethash Generate Token for User
   * @return Json data Login Sesion user
   */
  signup(userToLogin,gethash=null):Observable<any>
  {
    if(gethash!=null) {
      userToLogin.gethash=gethash;
    }

    let json:string = JSON.stringify(userToLogin),
      params:string = json,
      headers:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'login',params,{headers:headers});
  }
  /**
   * Register User in Database
   *
   */
  register(userToRegister:User):Observable<any>
  {
    let params:string = JSON.stringify(userToRegister),
      headers:HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post(this.url + 'register', params, { headers: headers });
  }
  /**
   * Get inentified Session User
   * @return Json identity formatter
   */
  getIdentity(): User {
    return JSON.parse(localStorage.getItem('identity')) as User
  }

  /**
   * Actualiza la informacion del usuario en localstorage
   *
   * @param user Usuario a actualizar
   * @return void
   */
  setIdentity(user:User):void {
    localStorage.setItem('identity', JSON.stringify(user))
  }

  /**
   * Get inentified Session User
   * @return Json token formatted
   */
  getToken():string {
    let token:string = localStorage.getItem('token')
    return token
  }

  /**
   * Actualiza el token del usuario
   *
   * @param token Token a actualizar
   */
  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  /**
   * Limpia la sesion activa del usuario
   */
  clearSession():void {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
  }

  updateUser(userToUpdate:User):Observable<any>
  {
    let params:string = JSON.stringify(userToUpdate),
      headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });

    return this._http.put(
      this.url + 'updateUser/'+userToUpdate._id,params, { headers: headers }
    );
  }
}
