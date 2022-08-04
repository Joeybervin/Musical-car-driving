import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  createNewUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth,email, password).then(
        () => {
        /* connexion */
        resolve();
      },
      (error: any) => {
        reject(error);
        console.log(error);
          }
        )
      }
    )
  }


    signInUser(email: string, password: string) {
      return new Promise<void>((resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email, password).then(
          () => {
          /* connexion */
          resolve();
        },
        (error: any) => {
          reject(error);
          console.log(error)
            }
          )
        }
      )
    }
  
    /* Pour déconnecter un utilisateur */
    signOutUser() {
      const auth = getAuth();
      signOut(auth);
    }



















}
