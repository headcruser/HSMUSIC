import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public titulo:string;
  public token:string
  public identity:User;
  public user: User;
  public alertUpdate:string;
  public url:string;

  constructor(private _userService: UserService) {
    this.titulo = 'Actualizar Datos';
    this.identity = this._userService.getIdentity() as User;
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {}

  updateUser() {
    this._userService.updateUser(this.user).subscribe(
      (response) => {

        if (!response.user) {
          return this.alertUpdate = 'El usuario no se ha actualizado'
        }

        this._userService.setIdentity(this.user);

        document.getElementById('identity-name').innerHTML = this.user.name

        if (!this.filesToUpload) {
          //Redirect
        } else {
          let urlFileUpload:string = this.url + 'uploadImageUser/' + this.user._id;

          /**
            NOTA: HAY QUE VALIDAR LO SIGUIENTE
            - LA EXISTENCIA DE LA CARPETA API/UPLOADS
            - MOSTRAR EL ERROR AL SUBIR LA IMAGEN
           */
          this.makeFileRequest(urlFileUpload, [], this.filesToUpload).then(
            (result: any) => {
              this.user.image = result.image

              this._userService.setIdentity(this.user);

              let imagePath = this.url + 'getImageUser/' + this.user.image

              document.getElementById('image-logged').setAttribute('src', imagePath)
            }
          )
        }

        this.alertUpdate = 'Datos Actualizados correctamente';
      },
      (error) => {


      }
    )
  }

  public filesToUpload: Array<File>

  /**
   * Captura los archivos que se suban al input "input-file-avatar"
   *
   * @param fileInput
   */
  fileChangedEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  /**
   * Peticion ajax para subir los archivos al servidor
   *
   * @param url Direccion del servidor
   * @param params Parametros de opciones
   * @param files Lista de archivos a subir
   */
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    let token = this.token;

    const STATE_DONE = 4,
          HTTP_OK = 200;

    return new Promise((resolve, reject) => {
      let formData: any = new FormData(),
          xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name)
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState != STATE_DONE) {
          return;
        }

        if (xhr.status == HTTP_OK) {
          resolve(JSON.parse(xhr.response))
        } else {
          reject(xhr.response)
        }
      }

      xhr.open('POST', url, true)
      xhr.setRequestHeader('Authorization', token)
      xhr.send(formData)
    })

  }

}
