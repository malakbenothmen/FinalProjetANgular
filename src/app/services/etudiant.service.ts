import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etudiant } from '../models/etudiant.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  baseUrl : string  = 'http://localhost:3000/posts';
  
     
  constructor(private http: HttpClient) {}

  getEtudiants() {
    return this.http.get<Etudiant[]>(this.baseUrl);
  }

  postEtudiant(etudiant: Etudiant) {
    return this.http.post<Etudiant>(this.baseUrl, etudiant);
  }

  deleteEtudiant(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  } 

  getEtudiantsByLevel(level: string): Observable<Etudiant[]> {
    const url = `${this.baseUrl}?level=${level}`;
    return this.http.get<Etudiant[]>(url);
  }

  getEtudiantsByGender(genre: string): Observable<Etudiant[]> {
    const url = `${this.baseUrl}?gender=${genre}`;
    return this.http.get<Etudiant[]>(url);
  }


}
