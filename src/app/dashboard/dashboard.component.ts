import { Component, OnInit} from '@angular/core';
import { Etudiant } from '../models/etudiant.model';
import {EtudiantService } from '../services/etudiant.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
/*import { MatIconModule } from '@angular/material/icon';*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {


  etudiantsByGender: Etudiant[] = [];
  etudiants: Etudiant[] = [];
  users: User[] = [];
  Admins: User[] = [];
  mentions: { mention: string, nombre: number }[] = [];
  girls : number =0;
  boys : number =0;
  etudiantInscrit : number=0;
  userCount : number=0;
  currentUser : any ;  

  constructor(private etudiantService: EtudiantService , private userService : AuthService) { }
 
  ngOnInit(): void {
  this.femalesNumber();
   this.malesNumber();
  

    this.etudiantService.getEtudiants().subscribe(
    (data) => {
        this.etudiants= data;
        this.etudiantInscrit=this.etudiants.length;
        this.getMention();
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);}
      );

    this.userService.getUsers().subscribe(
        (data) => {
            this.users= data;
            this.userCount=this.users.length;
            this.getAdmins(); 
          },
          (error) => {
            console.error('Une erreur s\'est produite : ', error);}
          );

        

  }
  etudiantByGender(genre: string) 
  {    
    this.etudiantService.getEtudiantsByGender(genre).subscribe(
    (data) => {
      this.etudiantsByGender = data;
      if(genre=='f')
      {this.girls = this.etudiantsByGender.length;
        console.log(`Nombre d'étudiants de genre femenin : ${this.girls}`);}
      else 
      {this.boys = this.etudiantsByGender.length;
      console.log(`Nombre d'étudiants de genre masculin : ${this.boys}`);}
    },
    (error) => {
      console.error('Une erreur s\'est produite : ', error);
    }
  );
}

femalesNumber()
{return this.etudiantByGender('f');}

malesNumber()
{return this.etudiantByGender('m');}

getAdmins()
{ 
  for(let i=0; i<this.users.length ; i++)

  {   
    if (this.users[i].role == 'admin')
    {
      this.Admins.push(this.users[i]);
      console.log("admin username", this.users[i]);
    }
  }

}

getMention()
{ 
  const mentionsPossibles = ['Passable', 'Assez bien' , 'Bien' , 'Très bien' , 'Excellent'];

  for (const mention of mentionsPossibles) {
    const etudiantsAvecMention = this.etudiants.filter(etudiant => this.verifierMention(etudiant.moyenne)== mention);
    this.mentions.push({mention, nombre : (etudiantsAvecMention.length*100/this.etudiants.length) });
  }

}

verifierMention(moy: number): string {
  if (moy >= 10 && moy < 12) {
    return 'Passable';
  } else if (moy >= 12 && moy < 14) {
    return 'Assez bien';
  } else if (moy >= 14 && moy < 16) {
    return 'Bien';
  } else if (moy >= 16 && moy < 18) {
    return 'Très bien';
  } else {
    return 'Excellent';
  } 

  }

  getColorByMention(mention: string): string {
    switch (mention) {
      case 'Passable':
        return '#f3712a';
      case 'Assez bien':
        return '#f3bd2a';
      case 'Bien':
        return '#b4f32a';
      case 'Très bien':
        return '#2af334';
      case 'Excellent':
        return '#2af3dd';
      default:
        return '#e1efed'; 
    }
  }


}



  


 

 





