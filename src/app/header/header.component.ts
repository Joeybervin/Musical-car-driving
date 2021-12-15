import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { getAuth, onAuthStateChanged} from "firebase/auth";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public isOpen = false;
  /* Pour connaître l'état d'authentification */
  isAuth!: boolean;

  /* Pour ouvrir et fermer le side menu au clique sur le svg (burger-menu) */
  public openNav() {
    this.isOpen = !this.isOpen;
  }

  constructor(private authService : AuthService) { }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth,
      (user) => {
        if(user) {
          /* Lutilisateur est connecté */
          this.isAuth = true;
        } else {
          /* L'utilisateur n'est pas connecté => accès limité au site */
          this.isAuth = false;
        }
      }
    );
  }

  /* Pour que l'utilisateur puisse se déconnecter */
  onSignOut(): void {
    this.authService.signOutUser();
  }
}
