import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }


  /* A REVOIR SI PAS PLUS JUDICIEUX D'UTILISER (voir la différence avec canActivate) :
  canActivateChild
  */

  canActivate() : Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth,
          (user) => {
            if(user) {
              /* Lutilisateur est connecté */
              return resolve(true)
            } else {
              /* L'utilisateur n'est pas connecté => renvoie vers la page de connexion */
              this.router.navigate(['/auth','signin']);
              return false
            }
          }
        );
        }
    )

  
}

}
