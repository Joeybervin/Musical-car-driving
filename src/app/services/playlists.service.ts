import { Injectable } from '@angular/core';
import { Playlist } from '../../app/models/playlist.model';
import { Subject } from 'rxjs';
import { getDatabase, ref , set , onValue, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  playlists: Playlist[] = [];
  playlistsSubject = new Subject<Playlist[]>();

  constructor() { }

  emitPlaylists() {
    this.playlistsSubject.next(this.playlists.slice());
  }

  /* Pour enregistrer des playlists dans la base de donné */
  savePlaylists() {
    const db = getDatabase();
    set(ref(db),  {
      playlists : this.playlists,

    });
  }

  /* Pour récupérer la liste des playlists */
  // on() => permet de réagir à des modifications de la base de donnée
  getPlaylists() {
    const db = getDatabase();
    const playlistRef = ref(db,'/playlists');
    onValue(playlistRef, (data) => {
      this.playlists = data.val()? data.val() : [];
      this.emitPlaylists();
    })
  }

  getSinglePlaylist(playlistId:number) {
    return new Promise( (resolve, reject) => {
      const db = getDatabase();
      const singlePlaylistRef = ref(db, '/playlists/' + playlistId)
      onValue(singlePlaylistRef, (data) => {
        resolve(data.val());
        this.emitPlaylists();
      },
        (error) => {
        reject(error)
        },
         {onlyOnce : true}
      );
    });
  }

  /* Ajouter une playlist à la liste */
  createNewPlaylist(newplaylist : Playlist) {
    this.playlists.push(newplaylist);
    this.savePlaylists();
    this.emitPlaylists();
  }

  removePlaylist(playlist : Playlist) {
    const playlistIndexToRemove = this.playlists.findIndex(
      (playlistElement) => {
        if (playlistElement === playlist) {
          /* Récupération de l'index du livre à supprimer */

          return true;
          
        }
        else {
          console.log('ici 2')
          return false;
        }
      }
    );
    this.playlists.splice(playlistIndexToRemove, 1);
    this.savePlaylists();
    this.emitPlaylists();
  }




  
}
