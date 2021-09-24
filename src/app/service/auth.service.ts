import { Injectable } from '@angular/core';
/* N'importe pas la partie pour l'authentification : import firebase from '@firebase/app'; */
/* import firebase from 'firebase' */
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /* Comme c'est une méthode qui prend du temps nous créons une méthode asynchrone */
  createNewUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        () => {
          /* Si tout se passe bien */
        resolve();
      },
      (error: any) => {
        reject(error);
          }
        )
      }
    )
  }

  /* Pour connecter un utilisateur possèdant déjà un compte */
  signInUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => {
          /* Si tout se passe bien */
        resolve();
      },
      (error: any) => {
        reject(error);
          }
        )
      }
    )
  }

  /* Pour déconnecter un utilisateur */
  signOutUser() {
    firebase.auth().signOut();
  }



}
