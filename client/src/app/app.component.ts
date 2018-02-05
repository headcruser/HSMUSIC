import { Component ,OnInit} from '@angular/core';
import {User} from './models/User';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService]
})
export class AppComponent implements OnInit{
  public title = 'HSMUSIC';
  public user:User;
  public identity;
  public token;
  public errorMessage;

  constructor(private _userService:UserService){
    this.user = new User('','','','','','ROLE_USER','');
  }

  public onSubmit()
  {
    console.log(this.user)
    // GET USER IDENTIFIED
    this._userService.signup(this.user).subscribe(
      response=>{
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert('El usuario no esta correctamente identificado');
        }else{
          // create sesion user
          // GET TOKEN FOR SEND HTTP PETITION
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let getToken = response.token;
              this.token = getToken;

              if (this.token.length <= 0) {
                alert('El token no se ha generado');
              } else {
                // create sesion user for token
              }
            },
            error => {
              var ErrorMessage = <any>error;
              if (ErrorMessage != null) {
                var body = JSON.parse(error._body)
                this.errorMessage = body.message
                console.log(error)
              }
            }
          );
        }
      },
      error=>{
        var ErrorMessage = <any>error;
        if(ErrorMessage!=null)
        {
          var body = JSON.parse(error._body)
          this.errorMessage = body.message
          console.log(error)
        }
      }
    );

  }
  ngOnInit(){

  }
}
