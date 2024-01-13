import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  message:string="";
  connexion=false;
  showAnimation = false;
  hideAnimation = false;
  selectedFile: File| undefined;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  

  onFileSelected(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.selectedFile = event.target.files?.[0];
    }
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      this.authService.authenticateUser(email, password).subscribe(
        isAuthenticated => {
          if (isAuthenticated) {
            this.message='Connexion réussie';
            
            this.navigation();
            this.connexion=true; }
          else 
          {this.message='Mot de passe ou email incorrect'; 
          this.loginForm.reset();}

          console.log(this.message);
        
        // Déclencher les animations
        this.showAnimation = true;
        setTimeout(() => {
          this.hideAnimation = true;
        }, 3000); // Durée de l'animation (en millisecondes)
      }
    );
  }
   
  }


  private navigation()
  {   const currentUser = this.authService.getCurrentUser(); 
        if (currentUser) {
            // Redirection en fonction du rôle
           if (currentUser.role === 'admin') {
              this.router.navigate(['/dashboard']);   } 
            else {
              this.router.navigate(['/espace-etud']);  }
        }
  }
  onAnimationEnd() {
    // Réinitialiser les états d'animation après la fin de l'animation
    this.showAnimation = false;
    this.hideAnimation = false;
  }
 
  logout() {
      this.authService.logout();
      this.router.navigate(['/login']); 

  }
}