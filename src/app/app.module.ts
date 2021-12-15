/* Imports de base */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Pages */
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { SinglePlaylistComponent } from './playlist-list/single-playlist/single-playlist.component';
import { PlaylistFormComponent } from './playlist-list/playlist-form/playlist-form.component';
import { SingleMusicComponent } from './playlist-list/single-playlist/single-music/single-music.component';
import { MusicFormComponent } from './playlist-list/single-playlist/music-form/music-form.component';
/* Pages éléments */
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

/* Services */
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MusicsService } from './services/musics.service';
import { PlaylistsService } from './services/playlists.service';

/* imports supplémentaires */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { YoutubeUrlPipe } from './pipes/youtube-url.pipe';



/* Routing de l'application */
const appRoutes : Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'auth/signup', component: SignupComponent},
  /* Section protégé par l'authentification de l'utilisateur */
  /* Google --> Firebase */
  /* canActivate : [AuthGuardService] */
  {path: 'playlists',canActivate : [AuthGuardService], component: PlaylistListComponent},
  {path: 'playlists/new',canActivate : [AuthGuardService], component: PlaylistFormComponent},
  {path: 'playlists/view/:playlistId/musics',canActivate : [AuthGuardService], component: SinglePlaylistComponent},
  {path: 'playlists/view/:playlistId/musics/new',canActivate : [AuthGuardService], component: MusicFormComponent},
  {path: 'playlists/view/:playlistId/musics/view/:musicId/music',canActivate : [AuthGuardService], component: SingleMusicComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // Pour les routes wildcard *pages inexistantes*  => component: PageNotFoundComponent | Wildcard route for a 404 page
  {path: '**', redirectTo: 'home'}
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PlaylistListComponent,
    SinglePlaylistComponent,
    PlaylistFormComponent,
    SingleMusicComponent,
    MusicFormComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    YoutubeUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    YouTubePlayerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    MusicsService,
    PlaylistsService
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }


