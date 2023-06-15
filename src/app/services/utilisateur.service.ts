import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageService } from './image.service';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  public _utilisateurs: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private imageService: ImageService) {}

  public getUtilisateurs() {
    this.http
      .get<Utilisateur[]>('http://localhost:8080/utilisateurs')
      .subscribe((utilisateurs: Utilisateur[]) => {
        for (let utilisateur of utilisateurs) {
          this.imageService.chargementImageProfil(utilisateur);
        }

        this._utilisateurs.next(utilisateurs);
      });
  }

  public getUtilisateur(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/utilisateur/' + id);
  }

  public deleteUtilisateur(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/admin/utilisateur/' + id);
  }

  public editionUtilisateur(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/admin/utilisateur', formData);
  }
}
