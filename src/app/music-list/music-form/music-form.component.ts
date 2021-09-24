
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Music } from 'Models/Music.model';
import { MusicsService } from 'src/app/service/musics.service';

@Component({
  selector: 'app-music-form',
  templateUrl: './music-form.component.html',
  styleUrls: ['./music-form.component.scss']
})
export class MusicFormComponent implements OnInit {

  musicForm! : FormGroup;
  fileIsUploading = false;
  fileUrl!: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private musicsService : MusicsService,
              private router: Router,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.musicForm = this.formBuilder.group( {
      title: ['', Validators.required],
      artist: ['', Validators.required]
    });
  }

  /* Pour enregistrer le livre */
  /* 1 : récupère les information du formulaire remplie par l'utilisateur */
  /* 2 : crée un nouveau titre */
  /* 3 : l'ajoute avec la method createNewMusic */
  /* 4 : Puis va nous rediriger vers la page avec la liste des musiques */
  onSaveMusic() {
    const title = this.musicForm.get('title')?.value
    const artist = this.musicForm.get('artist')?.value;
    /* Création du nouveau titre */
    const newMusic = new Music(title, artist);
    if(this.fileUrl && this.fileUrl !== '') {
      newMusic.photo = this.fileUrl
    }
    this.musicsService.createNewMusic(newMusic);
    this.router.navigate(['/musics']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.musicsService.uploadFile(file).then(
      (url: any) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  detectFiles(event: any) {
    this.onUploadFile(event.target.files[0]);
  }

}
