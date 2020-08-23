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
  public identity: User;
  public token: string;
  public errorMessage: string
  public alertRegister: string
  public url: string

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');
    this.url = GLOBAL.url
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity() as User;
    this.token = this._userService.getToken();
  }

  public onSubmit(form:any) {

    this._userService.signup(this.user).subscribe((response) => {
      let identity:User = response.user as User;
      this.identity = identity;

      if (!this.identity) {
        return alert('El usuario no esta correctamente identificado')
      }

      this._userService.setIdentity(identity)

      this._userService.signup(this.user, 'true').subscribe(
        response => {
          let token:string = response.token as string;
          this.token = token;

          if (this.token.length <= 0) {
            return alert('El Token no se ha generado')
          }

          this._userService.setToken(token);

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
    this._userService.clearSession();
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
