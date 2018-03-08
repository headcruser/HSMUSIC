import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'

//Import User
import {UserEditComponent} from './components/userEdit'
import { HomeComponent } from './components/home.component';

//Import Artist
import { ArtistListComponent } from './components/artistList.component';
import { ArtistAddComponent } from './components/artistAdd.component';
import { ArtistEditComponent } from './components/artistEdit.component';
import { ArtistDetailComponent } from './components/artistDetail.component';

//Import Album
import { AlbumAddComponent } from './components/albumAdd.component';
import { AlbumEditComponent } from './components/albumEdit.component';
import { AlbumDetailComponent } from './components/albumDetail.component';



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
  { path: 'artist/:id', component: ArtistDetailComponent },
  { path: 'misDatos', component: UserEditComponent },
  { path: 'createAlbum/:artist', component: AlbumAddComponent },
  { path: 'editAlbum/:id', component: AlbumEditComponent },
  { path: 'album/:id', component: AlbumDetailComponent },
  { path: '**', component: HomeComponent }
]

export const appRoutingProviders:any[]=[]
export const routing:ModuleWithProviders=RouterModule.forRoot( appRoutes)
