import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { EspaceEtudComponent } from './espace-etud/espace-etud.component';
import { Niv1Component } from './niv1/niv1.component';
import { Niv2Component } from './niv2/niv2.component';
import { Niv3Component } from './niv3/niv3.component';

@NgModule({
  declarations: [
    AppComponent,
    EtudiantComponent,
    HeaderComponent,
    SideBarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InscriptionComponent,
    EspaceEtudComponent,
    Niv1Component,
    Niv2Component,
    Niv3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
