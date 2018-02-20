import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing'

import { HomeComponent } from "./components/home.component";
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/userEdit';
import { ArtistListComponent } from './components/artistList.component';
import { ArtistAddComponent } from './components/artistAdd.component';
import { ArtistEditComponent } from './components/artistEdit.component';
import { ArtistDetailComponent } from './components/artistDetail.component';
import { AlbumAddComponent } from './components/albumAdd.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule{}
