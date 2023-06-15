import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  formulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private connexionService: ConnexionService,
    private router: Router
  ) {}

  erreurLogin: boolean = false;

  onSubmit(): void {
    if (this.formulaire.valid) {
      this.connexionService.connexion(this.formulaire.value).subscribe({
        next: (jwt) => {
          localStorage.setItem('jwt', jwt);
          this.connexionService.updateUserConnected();
          this.router.navigateByUrl('/accueil');
        },
        error: (error) => {
          this.erreurLogin = true;
        },
      });
    }
  }
}
