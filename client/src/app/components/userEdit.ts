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
    console.log(this.user)
  }
}
