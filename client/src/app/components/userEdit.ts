import {Component,OnInit} from '@angular/core'

import { UserService } from '../services/user.service'
import { User } from '../models/User'

@Component({
  selector:'userEdit',
  templateUrl:'../views/userEdit.html',
  providers:[UserService]
})

export class UserEditComponent implements OnInit
{
  public titulo:string
  public user:User
  public identity
  public token
  public alertMessage

  constructor(private _userService:UserService)
  {
    this.titulo='Actualizar Datos'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user= this.identity
  }

  ngOnInit()
  {
    console.log('User Edit Component.ts')
  }

  onSubmit()
  {
    this._userService.updateUser(this.user).subscribe(
      response=>
      {
          if(!response.user){
            return this.alertMessage='El usuario no se ha actualizado'
          }
          //this.user=response.user
          localStorage.setItem('identity',JSON.stringify(this.user))

          return this.alertMessage = 'Datos Actualizacos correctamente'
      },
      error=>
      {
        var ErrorMessage = <any>error
        if (ErrorMessage != null)
        {
          var body = JSON.parse(error._body)
          this.alertMessage = body.message
        }
      }
    )
  }
}
