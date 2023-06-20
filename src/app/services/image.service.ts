import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Utilisateur } from '../models/utilisateur';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  chargementImageProfil(utilisateur: Utilisateur) {
    if (utilisateur.nomImageProfil != null) {
      this.http
        .get(environment.serverURL + '/image-profil/' + utilisateur.id, {
          responseType: 'blob',
        })
        .subscribe((donneeImage: any) => {
          utilisateur.imageProfil = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(donneeImage)
          );
        });
    }
  }
}
