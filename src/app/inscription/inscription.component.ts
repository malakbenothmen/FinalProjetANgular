import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators  } from '@angular/forms';
import { Etudiant } from '../models/etudiant.model';
import {EtudiantService } from '../services/etudiant.service';
/*import { MatIconModule } from '@angular/material/icon';
import { PdfService } from '../services/pdf.service';*/
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEtudiantButton') addEtudiantButton: any;


  etudiantForm: FormGroup;
  totalEtudiants: number=0; 

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
  htmlContent = '<div><h1>Hello World!</h1></div>';

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService
  ) {
    this.etudiantForm = fb.group({});
    this.etudiants = [];
    this.etudiantsToDisplay = this.etudiants;
    this.totalEtudiants = 0; 
    
  }

  ngOnInit(): void {
    this.etudiantForm = this.fb.group({
      firstname: this.fb.control('',[Validators.required]),
      lastname: this.fb.control('',[Validators.required]),
      firstnameA: this.fb.control('',[Validators.required]),
      lastnameA: this.fb.control('',[Validators.required]),
      birthday: this.fb.control('',[Validators.required]),
      gender: this.fb.control('',[Validators.required]),
      niveau: this.fb.control('default',[Validators.required]),
      cin: this.fb.control('',[Validators.required]),
      moyenne: this.fb.control('',[Validators.required]),
      parcours: this.fb.control('',[Validators.required]),
    });

    this.etudiantService.getEtudiants().subscribe((res) => {
      for (let emp of res) {
        this.etudiants.unshift(emp);
      }
      this.etudiantsToDisplay = this.etudiants;
      this.calculateTotalEtudiants();
    });
  }

  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }

  addEtudiant() {
    if (this.etudiantForm.valid)
   { let etudiant: Etudiant = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      firstnameA: this.FirstNameA.value,
      lastnameA: this.LastNameA.value,
      birthdate: this.BirthDay.value,
      gender: this.Gender.value,
      niveau : this.educationOptions[parseInt(this.Niveau.value)],
      cin: this.Cin.value,
      parcours: this.parcoursOptions[parseInt(this.Parcours.value)],
      moyenne: this.Moyenne.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
    };
    this.etudiantService.postEtudiant(etudiant).subscribe((res) => {
      this.etudiants.unshift(res);
      this.clearForm();
    });
  }}

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
        this.setForm(val);
      }
    });
    this.removeEtudiant(event);
    this.addEtudiantButton.nativeElement.click();
  }

  setForm(emp: Etudiant) {
    this.FirstName.setValue(emp.firstname);
    this.LastName.setValue(emp.lastname);
    this.FirstNameA.setValue(emp.firstnameA);
    this.LastNameA.setValue(emp.lastnameA);
    this.BirthDay.setValue(emp.birthdate);
    this.Gender.setValue(emp.gender);

    let educationIndex = 0;
    this.educationOptions.forEach((val, index) => {
      if (val === emp.niveau) educationIndex = index;
    });
    this.Niveau.setValue(educationIndex);

    this.Cin.setValue(emp.cin);
    let parcoursIndex = 0;
    this.parcoursOptions.forEach((val, index) => {
      if (val === emp.parcours) parcoursIndex = index;
    });
    this.Parcours.setValue(parcoursIndex);
    this.Moyenne.setValue(emp.moyenne);
    this.fileInput.nativeElement.value = '';
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

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.FirstNameA.setValue('');
    this.LastNameA.setValue('');
    this.BirthDay.setValue('');
    this.Gender.setValue('');
    this.Niveau.setValue('');
    this.Cin.setValue('');
    this.Parcours.setValue('');
    this.Moyenne.setValue('');
    this.fileInput.nativeElement.value = '';
  }

  public get FirstName(): FormControl {
    return this.etudiantForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.etudiantForm.get('lastname') as FormControl;
  }
  public get FirstNameA(): FormControl {
    return this.etudiantForm.get('firstnameA') as FormControl;
  }
  public get LastNameA(): FormControl {
    return this.etudiantForm.get('lastnameA') as FormControl;
  }
  public get BirthDay(): FormControl {
    return this.etudiantForm.get('birthday') as FormControl;
  }
  public get Gender(): FormControl {
    return this.etudiantForm.get('gender') as FormControl;
  }
  public get Niveau(): FormControl {
    return this.etudiantForm.get('niveau') as FormControl;
  }
  public get Cin(): FormControl {
    return this.etudiantForm.get('cin') as FormControl;
  }
  public get Parcours(): FormControl {
    return this.etudiantForm.get('parcours') as FormControl;
  }
  public get Moyenne(): FormControl {
    return this.etudiantForm.get('moyenne') as FormControl;
  }

}
