import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  signUpForm!: UntypedFormGroup;
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
    this.signUpForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      /* pattern(expression régulière) : Impose un mot de passe de plus de 6 caractère de type alphanumérique */
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  /* Afin de soumettre le formulaire */
  onSubmit() {
    console.log('coco');
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    this.authService.createNewUser(email, password).then(
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
