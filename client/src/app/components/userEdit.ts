import {Component,OnInit} from '@angular/core'
import { UserService } from '../services/user.service'
import { User } from '../models/User'
import { GLOBAL} from '../services/global'

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
  public url:string

  constructor(private _userService:UserService)
  {
    this.titulo='Actualizar Datos'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user= this.identity
    this.url = GLOBAL.url
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
          localStorage.setItem('identity', JSON.stringify(this.user))
          document.getElementById('indentity_name').innerHTML=this.user.name

          if(!this.filesToUpload){
            //Redirect
          }else{
            this.makeFileRequest(this.url +'uploadImageUser/'+this.user._id,[],this.filesToUpload)
                .then(
                  (result:any)=>{
                    this.user.image=result.image
                    localStorage.setItem('identity', JSON.stringify(this.user))
                    let imagePath=this.url+'getImageUser/'+this.user.image
                    document.getElementById('imageLogged').setAttribute('src',imagePath)
                  }
                )

          }
          return this.alertMessage = 'Datos Actualizados correctamente'
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
  public filesToUpload: Array<File>

  fileChangedEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files
  }

  makeFileRequest(url:string,params:Array<string>,files:Array<File>)
  {
    var token = this.token

    return new Promise((resolve,reject)=>{
      var formData:any = new FormData()
      var xhr = new XMLHttpRequest()
      for(var i = 0 ; i< files.length; i++){
        formData.append('image',files[i],files[i].name)
      }
      xhr.onreadystatechange=()=>{
        if(xhr.readyState==4)
        {
            if(xhr.status==200){
              resolve(JSON.parse(xhr.response))
            }else{
              reject(xhr.response)
            }
        }
      }
      xhr.open('POST',url,true)
      xhr.setRequestHeader('Authorization',token)
      xhr.send(formData)
    })

  }
}
