import { Component, OnInit } from '@angular/core';
import { Music } from 'Models/Music.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicsService } from 'src/app/service/musics.service';

@Component({
  selector: 'app-single-music',
  templateUrl: './single-music.component.html',
  styleUrls: ['./single-music.component.scss']
})
export class SingleMusicComponent implements OnInit {

  music!: Music;

  constructor(private route: ActivatedRoute, private musicsService: MusicsService,
              private router: Router) {}

  ngOnInit() {
    this.music = new Music('', '');
    const id = this.route.snapshot.params['id'];
    this.musicsService.getSingleMusic(+id).then(
      /* Ne marchait pas quand je lui soumettais le type 'Music' */
      (music:any) => {
        this.music = music;
      }
    );
  }

  onBack() {
    this.router.navigate(['/musics']);
  }
}
