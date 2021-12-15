import { Injectable } from '@angular/core';
import { Music } from '../../app/models/music.model';
import { Subject } from 'rxjs';
import { getDatabase, ref as ref_database , onValue, update } from "firebase/database";
import { ActivatedRoute } from '@angular/router';
import { getStorage, ref as ref_storage, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class MusicsService {

  
  musics: Music[] = [];
  musicsSubject = new Subject<Music[]>();
  
  playlistId = this.route.snapshot.params['playlistId']
  

  constructor(private route : ActivatedRoute) {

  }

  emitMusics() {
    this.musicsSubject.next(this.musics);
  }

  /* Pour enregistrer des musics dans la base de donné correspondant à sa playlist */
  saveMusics(playlistId:string) {
    const db = getDatabase();
    
    update(ref_database(db,`/playlists/${playlistId}`), {
      musics : this.musics,
    });
  }

  saveMusicsImage(playlistId:string, musicId: string, imageURL : string) {
    const db = getDatabase();
    update(ref_database(db,`/playlists/${playlistId}/musics/${musicId}`), {
      image : imageURL,
    });
  }

  getMusics(playlistId:string) {
    const db = getDatabase();
    const MusicstRef = ref_database(db,'playlists/'  + `${playlistId}` + '/musics' );

    onValue(MusicstRef, (data) => {
      this.musics = data.val() ? data.val() : [] ;
      this.emitMusics();
    })
  }



  getSingleMusic(musicId:number,playlistId:number) {
    return new Promise( (resolve, reject) => {
      const db = getDatabase();
      const SingleMusicstRef = ref_database(db,`playlists/${playlistId}/` + 'musics/' + musicId );
      onValue(SingleMusicstRef, (data) => {
        resolve(data.val());
        console.log(data.val()['videoURL']);
        this.emitMusics();
      },
        (error) => {
        reject(error)
        },
        {onlyOnce : true}
      );
    });
  }

  createNewMusic(newMusic : Music,playlistId:string) {
    this.musics.push(newMusic);
    this.saveMusics(playlistId);
    this.emitMusics();
  }

  removeMusic(music: Music,playlistId:string) {
    if (music.image) {
      const storage = getStorage();
      const storageRef = ref_storage(storage, 'images/'  + music.imageName);
      console.log(storageRef)
      deleteObject(storageRef).then(() => {
        
        console.log('image supprimé')
      }).catch((error) => {
        console.log('ERREUR : image non supprimé' + error)
      });
    }
    const MusicToRemove = this.musics.findIndex(
      (musicElement) => {
        if (musicElement === music ) {
          return true;
        }
        else {
          return false;
        }
      }
    );
    this.musics.splice(MusicToRemove, 1);
    this.saveMusics(playlistId);
    this.emitMusics();
  }

  uploadFile(file: File) {
    return new Promise<void>((resolve, reject) => {
      const storage = getStorage();

      // Create the file metadata
      /** @type {any} */
      const metadata = { contentType: 'image/jpeg' };

      // Create a special key to name the file
      const storageRef = ref_storage(storage, 'images/'  + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            // ...
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
          reject()
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            return downloadURL;
          });
          resolve()
        }
      );



});
    
  }



}

