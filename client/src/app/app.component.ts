import { Component ,OnInit} from '@angular/core'
import {User} from './models/User'
import {UserService} from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService]
})
export class AppComponent implements OnInit
{
  //GLOBALS
  public title = 'HSMUSIC'
  public user:User
  public userRegister: User
  public identity
  public token
  public errorMessage
  public alertRegister: string

  constructor(private _userService:UserService)
  {
    this.user = new User('','','','','','ROLE_USER','')
    this.userRegister = new User('','','','','','ROLE_USER','')
  }
  /**
   * Init Componets for Class
   * @return void
   */
  ngOnInit()
  {
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }
  /**
   * Login Session
   * @return void
   */
  public onSubmit()
  {
    // GET USER IDENTIFIED
    this._userService.signup(this.user).subscribe(
      response=>{
        let identity = response.user
        this.identity = identity

        if(!this.identity._id){
          alert('El usuario no esta correctamente identificado')
        }else
        {
          // CREATE LOCAL STORAGE
          localStorage.setItem('identity',JSON.stringify(identity))
          // GET TOKEN FOR SEND HTTP PETITION
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let getToken = response.token
              this.token = getToken

              if (this.token.length <= 0) {
                alert('El token no se ha generado')
              } else {
                // create sesion user for token
                localStorage.setItem('token',getToken)
                this.user = new User('', '', '', '', '', 'ROLE_USER', '')
              }
            },
            error => {
              var ErrorMessage = <any>error
              if (ErrorMessage != null) {
                var body = JSON.parse(error._body)
                this.errorMessage = body.message
                console.log(error)
              }
            }
          )
        }
      },
      error=>{
        var ErrorMessage = <any>error
        if(ErrorMessage!=null)
        {
          var body = JSON.parse(error._body)
          this.errorMessage = body.message
          console.log(error)
        }
      }
    )
  }

  public logout()
  {
    localStorage.removeItem('identity')
    localStorage.removeItem('token')
    localStorage.clear()
    this.identity = null
    this.token = null
  }

  public onSubmitRegister()
  {
      console.log(this.userRegister)

      this._userService.register(this.userRegister).subscribe(
        response=>{
          let user = response.user
          this.userRegister=user

          if(!user._id){
            this.alertRegister = 'Error al registrarse'
          }else{
            this.alertRegister = 'El registro se ha realizado correctamente, Registrate con: '+this.userRegister.email
            this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '')
          }
        },
        error=>{
          var ErrorMessage = <any>error
          if (ErrorMessage != null)
          {
            var body = JSON.parse(error._body)
            this.alertRegister = body.message
            console.log(error)
          }
        }
      )
  }
}
