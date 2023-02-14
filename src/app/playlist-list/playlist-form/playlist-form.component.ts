import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Music } from 'src/app/models/music.model';
import { Playlist } from 'src/app/models/playlist.model';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styles: [
  ]
})
export class PlaylistFormComponent implements OnInit {

  playlistForm!: UntypedFormGroup;
  musics: Music[] = [];

  constructor(private formBuilder: UntypedFormBuilder,
              private playlistsService: PlaylistsService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.playlistForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    
  }

  onSavePlaylist() {
    const title = this.playlistForm.get('title')?.value;
    const image = this.playlistForm.get('image')?.value;
    const newPlaylist = new Playlist(title);
    this.playlistsService.createNewPlaylist(newPlaylist);
    this.router.navigate(['/playlists'])
  }

  onBack() {
    this.router.navigate(['/playlists'])
  }

}
