import { Component } from '@angular/core';
/* NE MARCHE PAS :  import * as firebase from 'firebase'; */
import firebase from '@firebase/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: "AIzaSyBaEloa6dNXjPpd_4iiT-hH022eBnRqjTs",
      authDomain: "my-music-library-2.firebaseapp.com",
      databaseURL: "https://my-music-library-2-default-rtdb.europe-west1.firebasedatabase.app/",
      projectId: "my-music-library-2",
      storageBucket: "my-music-library-2.appspot.com",
      messagingSenderId: "<SENDER_ID>",
    };
    firebase.initializeApp(config);
  }
}
