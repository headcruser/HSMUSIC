import {Injectable} from '@angular/core'
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()
export class UserService{
  public url:string;
  public identity;
  public token;

  constructor(private _http:Http){
    this.url= GLOBAL.url;
  }
  /**
   * Login User application
   * @param userToLogin Object User
   * @param getHash Generate Token for User
   * @return Json data Login Sesion user
   */
  signup(userToLogin,getHash=null)
  {
    if(getHash!=null){
      userToLogin.getHash=getHash;
    }
    let json = JSON.stringify(userToLogin);
    let params= json;
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'login',params,{headers:headers})
            .map(res=>res.json());
  }
  /**
   * Get inentified Session User
   * @return Json identity formatter
   */
  getIdentity()
  {
    let identity = JSON.parse(localStorage.getItem('identity'))
    if(identity != "undefined"){
      this.identity=identity
    }else{
      this.identity = null
    }
    return this.identity
  }
  /**
   * Get inentified Session User
   * @return Json token formatted
   */
  getToken()
  {
    let token = JSON.parse(localStorage.getItem('token'))
    if (token != "undefined") {
      this.token = token
    } else {
      this.token = null
    }
    return this.token
  }
}
