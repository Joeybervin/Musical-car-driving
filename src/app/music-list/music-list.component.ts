import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Music } from 'Models/Music.model';
import { Subscription } from 'rxjs';
import { MusicsService } from '../service/musics.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit, OnDestroy {
  
  musics: Music[] = [];
  musicsSubscription! : Subscription;

  constructor(private musicsService: MusicsService,
              private router: Router) {}

  ngOnInit(): void {
    this.musicsSubscription = this.musicsService.musicSubject.subscribe(
      (musics: Music[]) => {
        this.musics = musics;
      }
    );
    this.musicsService.getMusics();
    this.musicsService.emitMusics();
  }

  /* Pour ajouter une nouvelle music */
  onNewMusic() {
    this.router.navigate(['/musics', 'new'])
  }

  /* Pour suppromer une music */
  /* Prend la musique en arguement */
  onDeleteMusic(music: Music) {
    this.musicsService.removeMusic(music)
  }
  
  /* Pour voir la musique sélectionner */
  /* Prend l'id dde la musique comme arguement */
  onViewMusic(id: number) {
    this.router.navigate(['/musics', 'view', id])
  }

  ngOnDestroy() {
    this.musicsSubscription.unsubscribe();
  }

}
