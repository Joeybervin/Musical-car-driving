import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
/* NE MARCHE PAS :  import * as firebase from 'firebase'; */
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (user: any) => {
          if(user) {
            resolve(true);
          }
          else {
            this.router.navigate(['/auth', 'signin'])
            resolve(false);
          }
        }
      )
    })
  }


}