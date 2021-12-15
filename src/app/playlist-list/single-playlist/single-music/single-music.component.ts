import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from 'src/app/models/music.model';
import { MusicsService } from 'src/app/services/musics.service';
@Component({
  selector: 'app-single-music',
  templateUrl: './single-music.component.html',
  styles: [
  ]
})
export class SingleMusicComponent implements OnInit {
  
  music!: Music ;
  musicId = this.route.snapshot.params['musicId']



  constructor(private route: ActivatedRoute,
              private router: Router,
              private musicsService : MusicsService) {}

  

  ngOnInit() {
    // Création d'une musique temporaire => en attente de la réponse du serveur 
    this.music = new Music('','')
    const musicId = this.route.snapshot.params['musicId']
    const  playlistId = this.route.snapshot.params['playlistId']
    parseInt(playlistId)
    this.musicsService.getSingleMusic(+musicId,+playlistId).then(
      // Problème quand j'impose le type ( ici Music) à la sortie
      (music: any) => {
        this.music = music;
      })

  }

  
  
  
  // Afin de retourner en arrière
  onBack() {
    const  playlistId = this.route.snapshot.params['playlistId']
    this.router.navigate(['playlists','view' , playlistId, 'musics'])
  }


  

}
