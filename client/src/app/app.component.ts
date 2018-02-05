import { Component } from '@angular/core';
import {User} from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'HSMUSIC';
  public user:User;
  public identity;
  public token;

  constructor(){
    this.user = new User('','','','','','ROLE_USER','');
  }

  public onSubmit(){
    console.log(this.user)
  }
}
