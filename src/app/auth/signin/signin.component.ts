import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;
  /* Affichage eventuel d'un message d'erreur */
  errorMessage! : string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm()
  }

  /* Initialisation du Formulaire à remplir */
  initForm(){
    this.signInForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      /* pattern(expression régulière) : Impose un mot de passe de plus de 6 caractère de type alphanumérique */
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  /* Afin de soumettre le formulaire */
  onSubmit() {
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;
    this.authService.signInUser(email, password).then(
      () => {
        /* OK: envoie l'utilisateur vers la liste de musiques */
        this.router.navigate(['/musics']);
      },
      (error) => {
        this.errorMessage = error
      }
    )
  }

}
