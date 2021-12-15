// Imports
//
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Model
import { Music } from 'src/app/models/music.model';
import { Playlist } from 'src/app/models/playlist.model';
// Services
import { MusicsService } from 'src/app/services/musics.service';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styles: [
  ]
})
export class SinglePlaylistComponent implements OnInit,OnDestroy {

  playlist! : Playlist;
  musics! : Music[];
  musicsSubscription!: Subscription;
  playlistId = this.route.snapshot.params['playlistId']

  constructor(private route: ActivatedRoute,
              private musicsService : MusicsService,
              private playlistsService : PlaylistsService,
              private router: Router,) {
               
              }

  ngOnInit(): void {
    // Pour mettre à jour l'arrêt local depuis le service qui est connecté à notre base de données
    this.musicsSubscription = this.musicsService.musicsSubject.subscribe(
      (musics: Music[]) => {
        this.musics = musics;
      });
      this.musicsService.getMusics(this.playlistId);
      this.musicsService.emitMusics();




      // Création d'une musique temporaire => en attente de la réponse du serveur 
    this.playlist = new Playlist('title')
    const  playlistId = this.route.snapshot.params['playlistId']
    parseInt(playlistId)
    this.playlistsService.getSinglePlaylist(+playlistId).then(
      // Problème quand j'impose le type ( ici Music) à la sortie
      (playlist: any) => {
        this.playlist = playlist;
      }
      
    )
      
  }

  // Pour créer une nouvelle musict
  //   => en réaction à un clique de l'utilisateur
  //
  onNewMusic() {
    this.router.navigate(['playlists','view', this.playlistId ,'musics','new'])
  }

  // Pour supprimer une musict
  //  => en réaction à un clique de l'utilisateur
  //
  onDeleteMusic(music: Music ) {
    this.musicsService.removeMusic(music,this.playlistId)
  }

  // Pour naviguer vers une musique en particulier
  //  => en réaction à un clique de l'utilisateur
  //
  onViewMusic( musicId:number) {
    this.router.navigate(['playlists','view' , this.playlistId , 'musics','view', musicId , 'music'])
    
  }

  ngOnDestroy() {
    this.musicsSubscription.unsubscribe();
  }
  onBack() {
    this.router.navigate(['/playlists'])
  }



}
