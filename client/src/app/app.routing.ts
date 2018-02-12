import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import {UserEditComponent} from './components/userEdit'
import { ArtistListComponent } from './components/artistList.component';


const appRoutes:Routes=[
  {
    path:'',
    redirectTo:'/artists/1',
    pathMatch:'full'
  },
  { path: '', component: ArtistListComponent },
  { path: 'artists/:page', component: ArtistListComponent },
  { path: 'misDatos', component: UserEditComponent },
  { path: '**', component: UserEditComponent }
]

export const appRoutingProviders:any[]=[]
export const routing:ModuleWithProviders=RouterModule.forRoot( appRoutes)
