import {  Component,  ViewChild } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { Etudiant } from '../models/etudiant.model';
import {EtudiantService } from '../services/etudiant.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-niv3',
  templateUrl: './niv3.component.html',
  styleUrls: ['./niv3.component.css']
})
export class Niv3Component {
  showContent: boolean = false;

  etudiants: Etudiant[];
  etudiantsToDisplay: Etudiant[];
  educationOptions = [
    'niveau 1',
    'niveau 2',
    'niveau 3',
 
  ];
  parcoursOptions = [
    'DSI',
    'RSI',
    'MDW',
    'SEM',
 
  ];


  constructor(
   
    private etudiantService: EtudiantService
  ) {

    this.etudiants = [];
    this.etudiantsToDisplay = this.etudiants.filter(etudiant => etudiant.niveau === 'niveau 3');
   
    
  }

  ngOnInit(): void {


    this.etudiantService.getEtudiants().subscribe((res) => {
      for (let emp of res) {
        this.etudiants.unshift(emp);
      }
      this.etudiantsToDisplay = this.etudiants.filter(etudiant => etudiant.niveau === 'niveau 3');
    });
    this.trierEtudiantsParNom();
  }

  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }


  removeEtudiant(event: any) {
    this.etudiants.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.etudiantService.deleteEtudiant(event).subscribe((res) => {
          this.etudiants.splice(index, 1);
        });
      }
    });
  }






  searchEtudiants(event: any) {
    let filteredEtudiants: Etudiant[] = [];

    if (event === '') {
      this.etudiantsToDisplay = this.etudiants;
    } else {
      filteredEtudiants = this.etudiants.filter((val, index) => {
        let targetKey = val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.etudiantsToDisplay = filteredEtudiants;
    }
  }





  showUniversityInfo = true; 

  universityName = 'Example University';
  department = 'Computer Science';
  level = 'Bachelor';
  className = 'Class A';

  trierEtudiantsParNom() {
    this.etudiants.sort((a, b) => {
      return a.lastnameA.localeCompare(b.lastnameA, 'أ' );
    });
  }


  async generatePdf() {
    console.log('generatePdf called');
    const doc = new jsPDF();



    const element = document.getElementById('this_is'); 
    if (element) {
      const canvas = await html2canvas(element);
      const imageData = canvas.toDataURL('image/png');
      doc.addImage(imageData, 'PNG', 15, 30, canvas.width*0.13, canvas.height *0.13); 
    }

    // Save the PDF
    doc.save('niveau3.pdf');
  }
}
