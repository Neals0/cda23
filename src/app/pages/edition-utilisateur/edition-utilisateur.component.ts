import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { PaysService } from 'src/app/services/pays.service';
import { Pays } from 'src/app/models/pays';

@Component({
  selector: 'app-edition-utilisateur',
  templateUrl: './edition-utilisateur.component.html',
  styleUrls: ['./edition-utilisateur.component.scss'],
})
export class EditionUtilisateurComponent {
  formulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    nom: ['', [Validators.required, Validators.minLength(3)]],
    prenom: ['', [Validators.required]],
    pays: [null, []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private serviceUtilisateur: UtilisateurService,
    private servicepays: PaysService
  ) {}

  idUtilisateur?: number; // ou "idUtilisateur : number | undefined"
  codeRetour: number = 0;
  messageErreur: string = '';
  listePays: Pays[] = [];
  fichier: File | null = null;

  ngOnInit() {
    this.servicepays.getPays().subscribe({
      next: (listePays) => (this.listePays = listePays),
      error: (erreur) => console.log(erreur),
    });

    this.route.params.subscribe((parametres) => {
      this.idUtilisateur = parametres['id'];

      if (this.idUtilisateur != null) {
        this.serviceUtilisateur.getUtilisateur(this.idUtilisateur).subscribe({
          next: (utilisateur: Utilisateur) => {
            this.formulaire.get('email')?.setValue(utilisateur.email);
            this.formulaire.get('nom')?.setValue(utilisateur.nom);
            this.formulaire.get('prenom')?.setValue(utilisateur.prenom);
            this.formulaire.get('pays')?.setValue(utilisateur.pays);
          },
          error: (erreurRequete) => {
            if (erreurRequete.status === 404) {
              this.codeRetour = 404;
            } else {
              this.codeRetour = 500;
              this.messageErreur = erreurRequete.message;
            }
          },
        });
      }
    });
  }

  onImageSelectionne(event: any) {
    this.fichier = event.target.files[0];
  }

  comparePays(paysOption: any, paysUtilisateur: any) {
    return paysUtilisateur != null && paysUtilisateur.id == paysOption.id;
  }

  onSubmit() {
    if (this.formulaire.valid) {
      const formData = new FormData();

      const utilisateur: Utilisateur = this.formulaire.value;
      utilisateur.id = this.idUtilisateur;

      if (this.fichier) {
        formData.append('fichier', this.fichier);
      }

      formData.append(
        'utilisateur',
        new Blob([JSON.stringify(this.formulaire.value)], {
          type: 'application/json',
        })
      );

      this.serviceUtilisateur
        .editionUtilisateur(formData)
        .subscribe((resultat) => this.router.navigateByUrl('accueil'));
    }
  }
}
