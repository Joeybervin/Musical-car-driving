import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [
  ]
})
export class SigninComponent implements OnInit {

  signInForm!: UntypedFormGroup;
  errorMessage!: string;

  constructor(private authService: AuthService,
              private formBuilder: UntypedFormBuilder,
              private router: Router) { }

  ngOnInit() {
    /* On initialise le formulaire */
    this.initForm();
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
        /* OK: envoie l'utilisateur vers la liste des playliste */
        this.router.navigate(['/playlists']);
      },
      (error) => {
        this.errorMessage = error
      }
    )
  }

}
