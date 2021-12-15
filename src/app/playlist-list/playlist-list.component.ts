// Imports
//
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDatabase } from 'firebase/database';
import { Subscription } from 'rxjs';
// Model
import { Playlist } from '../models/playlist.model';
// Service
import { PlaylistsService } from '../services/playlists.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styles: [
  ]
})
export class PlaylistListComponent implements OnInit, OnDestroy {

  playlists!: Playlist[];
  playlistsSubscription!: Subscription;
  
  
  constructor(private playlistsService : PlaylistsService,
              private router: Router) { }

  ngOnInit(): void {
    // Pour mettre à jour l'arrêt local depuis le service qui est connecté à notre base de données
    this.playlistsSubscription = this.playlistsService.playlistsSubject.subscribe(
      (playlists: Playlist[]) => {
        this.playlists = playlists;
      }
    );

    this.playlistsService.getPlaylists();
    this.playlistsService.emitPlaylists();
    
  }

  // Pour créer une nouvelle playlist
  //   => en réaction à un clique de l'utilisateur
  //
  onNewPlaylist() {
    this.router.navigate(['playlists','new'])
  }

  // Pour supprimer une playlist
  //  => en réaction à un clique de l'utilisateur
  //
  onDeletePlaylist(playlist: Playlist) {
    this.playlistsService.removePlaylist(playlist)
  }

  // Pour naviguer vers une playlist en particulier
  //  => en réaction à un clique de l'utilisateur
  //
  onViewPlaylist(playlistId : number) {
    this.router.navigate(['playlists','view' , playlistId , 'musics'])
  }

  ngOnDestroy() {
    this.playlistsSubscription.unsubscribe();
  }

  

  navigateToHome() {
    this.router.navigate(['/'])
  }

}
