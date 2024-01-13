import {  Component,  ViewChild } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { Etudiant } from '../models/etudiant.model';
import {EtudiantService } from '../services/etudiant.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-niv1',
  templateUrl: './niv1.component.html',
  styleUrls: ['./niv1.component.css']
})
export class Niv1Component {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEtudiantButton') addEtudiantButton: any;
  etudiantForm: FormGroup;
  totalEtudiants: number=0; 
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
    private fb: FormBuilder,
    private etudiantService: EtudiantService
  ) {
    this.etudiantForm = fb.group({});
    this.etudiants = [];
    this.etudiantsToDisplay = this.etudiants.filter(etudiant => etudiant.niveau === 'niveau 1');
    this.totalEtudiants = 0; 
    
  }

  ngOnInit(): void {

    

    this.etudiantService.getEtudiants().subscribe((res) => {
      for (let emp of res) {
        this.etudiants.unshift(emp);
      }
      this.etudiantsToDisplay = this.etudiants.filter(etudiant => etudiant.niveau === 'niveau 1');
      this.calculateTotalEtudiants();
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

  editEtudiant(event: any) {
    this.etudiants.forEach((val, ind) => {
      if (val.id === event) {
      }
    });
    this.removeEtudiant(event);
    this.addEtudiantButton.nativeElement.click();
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
  calculateTotalEtudiants() {
    this.totalEtudiants = this.etudiants.length;
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
    doc.save('niveau2.pdf');
  }

}
