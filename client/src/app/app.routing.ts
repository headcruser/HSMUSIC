import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import {UserEditComponent} from './components/userEdit'
import { ArtistListComponent } from './components/artistList.component';
import { HomeComponent } from './components/home.component';
import { ArtistAddComponent } from './components/artistAdd.component';
import { ArtistEditComponent } from './components/artistEdit.component';


const appRoutes:Routes=[
  // {
  //   path:'',
  //   redirectTo:'/artists/1',
  //   pathMatch:'full'
  // },
  { path: '', component: HomeComponent },
  { path: 'artists/:page', component: ArtistListComponent },
  { path: 'createArtist', component: ArtistAddComponent },
  { path: 'editArtist/:id', component: ArtistEditComponent },
  { path: 'misDatos', component: UserEditComponent },
  { path: '**', component: HomeComponent }
]

export const appRoutingProviders:any[]=[]
export const routing:ModuleWithProviders=RouterModule.forRoot( appRoutes)
