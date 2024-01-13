import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

import { Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';
  private currentUser: any;
  private currentUserKey = 'currentUser';


  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]>
  {
     return this.http.get<User[]>(this.apiUrl);
  }

    public register(newUser: User): Observable<User> {
        newUser.role = (newUser.username.toLowerCase().includes('admin') && newUser.password.toLowerCase().includes('admin')) ? 'admin' : 'etudiant';
        return this.http.post<User>(this.apiUrl, newUser);
  }



 
  authenticateUser(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.currentUser = user;
          localStorage.setItem(this.currentUserKey, JSON.stringify(user));
        }
        return !!user; // Renvoie vrai si l'utilisateur est trouvé, sinon faux
      })
    );
  }
 
  
      getCurrentUser(): any {
        return this.currentUser;
      }

      getCurrentUserbyStore(): any {
        const userString = localStorage.getItem(this.currentUserKey);
        return userString ? JSON.parse(userString) : null;
      }


      logout(): void {
        // Supprimer l'utilisateur de localStorage lors de la déconnexion
        localStorage.removeItem(this.currentUserKey);
      }





}




