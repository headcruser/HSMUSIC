import { Component } from '@angular/core';
import { User } from './models/User';
import { GLOBAL } from './services/global';
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})

export class AppComponent {
  public title = 'hs-music';
  public user: User;
  public userRegister: User
  public identity: String;
  public token: String;
  public errorMessage: String
  public alertRegister: String
  public url: String

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');
    this.url = GLOBAL.url
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onSubmit(form:any) {

    this._userService.signup(this.user).subscribe((response) => {
      let identity = response.user;
      this.identity = identity;

      if (!this.identity) {
        return alert('El usuario no esta correctamente identificado')
      }

      //CREATE ELEMENT LOCALSTORTAGE
      localStorage.setItem('identity', JSON.stringify(identity));

      this._userService.signup(this.user, 'true').subscribe(
        response => {
          let token = response.token
          this.token = token

          if (this.token.length <= 0) {
            return alert('El Token no se ha generado')
          }

          //CREATE TOKEN IN LOCALSTORAGE
          localStorage.setItem('token', token)
          this.user = new User('', '', '', '', '', 'ROLE_USER', '')
        },
        (error) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          this.errorMessage = errorMessage;
        });


    }, (error) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      this.errorMessage = errorMessage;
    });
  }

  public logout() {
    localStorage.removeItem('identity')
    localStorage.removeItem('token')
    localStorage.clear()
    this.identity = null
    this.token = null
  }

  public onSubmitRegister() {
    this._userService.register(this.userRegister).subscribe(
      (response) => {
        let user = response.user
        this.userRegister = user

        if (!user._id) {
          this.alertRegister = 'Error al registrarse'
        } else {
          this.alertRegister = 'El registro se ha realizado correctamente, Registrate con: ' + this.userRegister.email
          this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '')
        }
      },
      (error) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        this.alertRegister = errorMessage;
      }
    );

  }
}
