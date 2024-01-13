import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  newUser: User = new User(0,"","","","");
  confirmPassword:string="";
  users = new Array<User>();
  constructor( private authService:AuthService, private router: Router ) {
         authService.getUsers().subscribe(response => {
          this.users = response.map(item => {return new User(item.id, item.email, item.username, item.password ); });
        });
  }

  onSubmit() {
    if (this.newUser.password === this.confirmPassword) {
      this.authService.register(this.newUser).subscribe(
        (user) => this.handleSuccess(user),
        (error) => this.handleError(error)
      );
    } else {
      this.handleError("Les mots de passe ne correspondent pas");
    }
  }

  private handleSuccess(user: User) {
    console.log('Utilisateur enregistré avec succès:', user);
    this.router.navigate(['/login']);
  }

  private handleError(error: any) {
    console.error('Erreur lors de l\'enregistrement:', error);

    this.clearFields();
  }

  private clearFields() {
    this.newUser = new User(0,'','','');
    this.confirmPassword = '';
  }

}


