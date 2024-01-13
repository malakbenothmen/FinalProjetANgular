import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component" ; 
import { RegisterComponent} from "./register/register.component" ; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { EspaceEtudComponent } from './espace-etud/espace-etud.component';
import { Niv1Component } from './niv1/niv1.component';
import { Niv2Component } from './niv2/niv2.component';
import { Niv3Component } from './niv3/niv3.component';
const routes: Routes = [
  { path :'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'register', component: RegisterComponent },
  {path : 'dashboard', component: DashboardComponent},
  {path : 'inscription', component: InscriptionComponent},
  {path : 'espace-etud', component: EspaceEtudComponent},
  {path : 'niv1' , component : Niv1Component},
  {path : 'niv2' , component : Niv2Component},
  {path : 'niv3' , component : Niv3Component},

  { path: '**', redirectTo: '/login' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
