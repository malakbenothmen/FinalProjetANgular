import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Etudiant } from '../models/etudiant.model';
/*import { PdfService } from '../services/pdf.service';*/
@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  @Input() etudiant: Etudiant;
  @Output() onRemoveEtudiant = new EventEmitter<number>();
  @Output() onEditEtudiant = new EventEmitter<number>();

  constructor(/*private pdfService: PdfService*/) {
    this.etudiant = {
      firstname: '',
      lastname: '',
      firstnameA: '',
      lastnameA: '',
      birthdate: '',
      gender: '',
      niveau: '',
      cin: '',
      parcours: '',
      moyenne: 0,
      profile: '',
    };
  }

  ngOnInit(): void {
    console.log(this.etudiant);
  }

  deleteEtudiantClicked() {
    this.onRemoveEtudiant.emit(this.etudiant.id);
  }

  editEtudiantClicked(){
    this.onEditEtudiant.emit(this.etudiant.id);
  }

  htmlContent = '<div><h1>Hello World!</h1></div>'; // Replace with your actual HTML content

  /*generatePdf(): void {
    const filename = 'example';
    this.pdfService.generatePdf(this.htmlContent, filename);
  }*/
}
