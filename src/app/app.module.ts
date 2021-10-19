import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MusicListComponent } from './music-list/music-list.component';
import { SingleMusicComponent } from './music-list/single-music/single-music.component';
import { MusicFormComponent } from './music-list/music-form/music-form.component';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';


/* Mes services */
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';
import { MusicsService } from './service/musics.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';



/* Le routing de mon application URL */
const appRoutes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  /* Donne l'accès à certaines pages qu'aux utilisateurs du site avec canActivate */
  {path: 'musics', canActivate : [AuthGuardService], component: MusicListComponent},
  {path: 'musics/new', canActivate : [AuthGuardService], component: MusicFormComponent},
  {path: 'musics/view/:id', canActivate : [AuthGuardService], component: SingleMusicComponent},
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: '**', redirectTo: 'accueil'}
]

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    SignupComponent,
    SigninComponent,
    MusicListComponent,
    SingleMusicComponent,
    MusicFormComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /* appRoutes correspond au path créer menant vers d'autres pages */
    /* Nous passons toutes les Roots dans une boucle for */
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    MusicsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
