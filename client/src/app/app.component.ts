import { Component, OnInit } from '@angular/core'
import {UserService} from './services/user.service'
import { User } from 'app/models/User'
import { GLOBAL } from './services/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit
{
  //GLOBALS
  public title = 'HSMUSIC'
  public user: User
  public userRegister: User
  public identity
  public token
  public errorMessage
  public alertRegister: string
  public url: string

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '')
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '')
    this.url = GLOBAL.url
  }

  ngOnInit()
  {
    this.identity = JSON.parse(localStorage.getItem('identity'))
    this.token = localStorage.getItem('token')
  }

  public onSubmit()
  {
    // GET DATA USER IDENTIFIED
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user
        this.identity = identity

        if (!this.identity._id) {
          return alert('El usuario no esta correctamente identificado')
        }
        //CREATE ELEMENT LOCALSTORTAGE
        localStorage.setItem('identity', JSON.stringify(identity))
        // BUILD TOKEN
        this._userService.signup(this.user, 'true').subscribe(
          response => {
            let token = response.token
            this.token = token

            if (this.token <= 0) {
              return alert('El Token no se ha generado')
            }
            //CREATE TOKEN IN LOCALSTORAGE
            localStorage.setItem('token', token)
            this.user = new User('', '', '', '', '', 'ROLE_USER', '')
          },
          error => {
            var ErrorMessage = <any>error
            if (ErrorMessage != null) {
              var body = JSON.parse(error._body)
              this.errorMessage = body.message
            }
          })

      },
      error => {
        var ErrorMessage = <any>error
        if (ErrorMessage != null) {
          var body = JSON.parse(error._body)
          this.errorMessage = body.message
        }
      })
  }
  /**
   * Close session
   * @return void
  */
  public logout()
  {
    localStorage.removeItem('identity')
    localStorage.removeItem('token')
    localStorage.clear()
    this.identity = null
    this.token = null
  }
  /**
   * Register User
   * @return void
  */
  public onSubmitRegister()
  {
    console.log(this.userRegister)
    this._userService.register(this.userRegister).subscribe(
      response => {
        let user = response.user
        this.userRegister = user

        if (!user._id) {
          this.alertRegister = 'Error al registrarse'
        } else {
          this.alertRegister = 'El registro se ha realizado correctamente, Registrate con: ' + this.userRegister.email
          this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '')
        }
      },
      error => {
        var ErrorMessage = <any>error
        if (ErrorMessage != null) {
          var body = JSON.parse(error._body)
          this.alertRegister = body.message
          console.log(error)
        }
      }
    )
  }
}
