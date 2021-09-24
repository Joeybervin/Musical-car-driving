import { Injectable } from '@angular/core';
import { Music } from 'Models/Music.model';
import { Subject } from 'rxjs/Subject';
/* import firebase from 'firebase' */
import firebase from 'firebase';
import { refsToArray } from '@angular/compiler/src/render3/util';


@Injectable({
  providedIn: 'root'
})
export class MusicsService {

  /* Création d'un array local d'objet de type Musics ici */
  musics: Music[] = [];
  musicSubject = new Subject<Music[]>();


  /* Afin d'émettre le subject */
  emitMusics() {
    this.musicSubject.next(this.musics.slice());
  }

  /* Pour enregistrer les livres */
  saveMusics() {
    /* set(this.musics) = l'array local sera enregistré à musics */
    /* ref('/musics') = les livre seront stocké ici */
    firebase.database().ref('/musics').set(this.musics)
  }

  /* Pour récupérer la liste des livres */
  getMusics() {
    /* .on() = permet à réagir à des modification de la base de données | 2 arguments : 1=> ce que nous souhaitons récupérer (sous quem forme) 2=> la fonction qui réagira à chaque évènement */
    /* évènement observé = value */
    firebase.database().ref('/musics').on('value', (data) => {
      this.musics = data.val() ? data.val() : [];
      this.emitMusics();
    })
  }

  getSingleMusic(id: number) {
    return new Promise ((resolve, reject) => {
      /* Nous utilisons ici la method .once() car nous ne récupérons qu'une seule musique */
      firebase.database().ref('/musics/' + id).once('value').then(
        (data) => {
          resolve(data.val());
        },
        (error) => {
          reject(error)
        }
      )
    })

  }

  /* Afin d'ajouter et créer une nouvelle musique | Recevra en argument */
  createNewMusic(newMusic: Music) {
    this.musics.push(newMusic);
    this.saveMusics();
    this.emitMusics();
  }

  removeMusic(music: Music) {
    if(music.photo){
      const storageRef = firebase.storage().refFromURL(music.photo)
      storageRef.delete().then(
        () => {
          console.log('photo supprimé')
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé : '+ error)
        })
    }
    const musicIndexToRemove = this.musics.findIndex(
      (musicEl) => {
        if(musicEl === music) {
          return true;
        }
        /* Une erreur apparaissait, car les chemins ne reetournaient pas tous une valeur */
        else {
          return false;
        }
      }
    );
    /* Une fois que nous avons retrouvé cette index */
    /* .splice = pour retirer un élément */
    this.musics.splice(musicIndexToRemove, 1)
    this.saveMusics();
    this.emitMusics();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref().child( 'images/' + almostUniqueFileName + file.name).put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
        console.log('Chargement...')
      },
      (error) => {
        console.log('Erreur de chargement + ' + error)
        reject();
      },
       () => {
         console.log("Chargement terminé")
         resolve(upload.snapshot.ref.getDownloadURL());
       }
      )
    })
  }

  constructor() {
    this.getMusics();
   }

}

