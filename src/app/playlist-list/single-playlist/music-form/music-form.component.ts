import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { resolve } from 'dns';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Music } from 'src/app/models/music.model';
import { MusicsService } from 'src/app/services/musics.service';

@Component({
  selector: 'app-music-form',
  templateUrl: './music-form.component.html',
  styles: [
  ]
})
export class MusicFormComponent implements OnInit {

  musicForm! : FormGroup;
  playlistId = this.route.snapshot.params['playlistId']
  musicId = this.route.snapshot.params['musicId']
  fileUrl!: string;
  fileIsUploading = false;
  fileUploaded = false;

  embedYoutubeURL = 'https://www.youtube.com/embed/' ;
  videoUrl : string = this.embedYoutubeURL ;

  


  constructor(private formBuilder: FormBuilder,
              private musicsService : MusicsService,
              private router: Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm()
  }
  
  initForm(): void {
    this.musicForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      videoURL: [''],
      // ,[Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]
      image: ['']
    });
  }

  onSaveMusic() {
    const title = this.musicForm.get('title')?.value;
    const artist = this.musicForm.get('artist')?.value;
    
    const newMusic = new Music(title, artist)


    if (this.musicForm.get('videoURL')?.value != ''){
      
      newMusic.videoURL = this.videoUrl + this.musicForm.get('videoURL')?.value;
    };
  
    
    const storage = getStorage();
    const imagesRef = ref(storage, 'images/'+ this.musicForm.get('image')?.value.replace("C:\\fakepath\\",''));

    
        // Get the download URL
      getDownloadURL(imagesRef)
        .then((url) => {
          console.log(url)
          
          newMusic.image = url;
          this.musicsService.createNewMusic(newMusic,this.playlistId);
    })
      
    
   

    
    if ( this.musicForm.get('image')?.value == '') {
      this.musicsService.createNewMusic(newMusic,this.playlistId);
    }
    
    

    this.router.navigate(['/playlists','view' , this.playlistId, 'musics'])
  }


  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.musicsService.uploadFile(file).then(
      (url: any) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true
      }
    );
  }

  detectImageFile(event:any){
    this.onUploadFile(event.target.files[0]);

  }

  onBack() {
    const  playlistId = this.route.snapshot.params['playlistId']
    this.router.navigate(['playlists','view' , playlistId, 'musics'])
  }

}
