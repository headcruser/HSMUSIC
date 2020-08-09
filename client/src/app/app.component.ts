import { Component } from '@angular/core';
import {User} from './models/User';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'hs-music';
  public user:User;
  public userRegister: User
  public identity:String;
  public token:String;
  public errorMessage:String
  public alertRegister: String
  public url: String

  constructor(){
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');
    this.url = GLOBAL.url
  }

  ngOnInit() {
    console.log('INIT COMPONENT');
  }

  public onSubmit(){
    console.log('SUBMIT');
  }

  public logout(){
    console.log('LOGOUT');
    localStorage.removeItem('identity')
    localStorage.removeItem('token')
    localStorage.clear()
    this.identity = null
    this.token = null
  }

  public onSubmitRegister() {
    console.log(this.userRegister);
  }
}
