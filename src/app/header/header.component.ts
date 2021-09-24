import { Component, OnInit } from '@angular/core';
/* NE MARCHE PAS :  import * as firebase from 'firebase'; */
import firebase from 'firebase/app';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth!: boolean;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut(): void {
    this.authService.signOutUser();
  }



}
