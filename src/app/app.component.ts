import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SingingCar';
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBVv4OwT2apno9tLChXm0r8wOy9e401ZMU",
      authDomain: "singingcarproject.firebaseapp.com",
      databaseURL: "https://singingcarproject-default-rtdb.firebaseio.com",
      projectId: "singingcarproject",
      storageBucket: "singingcarproject.appspot.com",
      messagingSenderId: "3587975044",
      appId: "1:3587975044:web:8bedbf9860d1a87c929fd1"
        };
    
    const app = initializeApp(firebaseConfig);
  }
}
