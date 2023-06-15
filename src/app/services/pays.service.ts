import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pays } from '../models/pays';

@Injectable({
  providedIn: 'root',
})
export class PaysService {
  constructor(private http: HttpClient) {}

  public getPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>('http://localhost:8080/liste-pays');
  }
}
