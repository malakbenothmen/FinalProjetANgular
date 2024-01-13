import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Etudiant } from '../models/etudiant.model';
import {EtudiantService } from '../services/etudiant.service';
import { AuthService } from '../services/auth.service';
/*import { MatIconModule } from '@angular/material/icon';*/

@Component({
  selector: 'app-espace-etud',
  templateUrl: './espace-etud.component.html',
  styleUrls: ['./espace-etud.component.css']
})
export class EspaceEtudComponent {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEtudiantButton') addEtudiantButton: any;


  etudiantForm: FormGroup;
  etudiants: Etudiant[];
  currentUser : any;
  isEditing: boolean = false;
  etudiantsToDisplay: Etudiant[];
  educationOptions = [ 'niveau 1', 'niveau 2','niveau 3',];
  parcoursOptions = ['IT','DSI', 'RSI','MDW','SEM',];

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private userService : AuthService
  ) {
    this.etudiantForm = fb.group({});
    this.etudiants = [];
    this.etudiantsToDisplay = this.etudiants;
  }

  ngOnInit(): void {
    this.etudiantForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      firstnameA: this.fb.control(''),
      lastnameA: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      niveau: this.fb.control('default'),
      cin: this.fb.control(''),
      moyenne: this.fb.control(''),
      parcours: this.fb.control('default'),
    });

    this.currentUser = this.userService.getCurrentUserbyStore();

    this.etudiantService.getEtudiants().subscribe((res) => {
      for (let emp of res) {
        this.etudiants.unshift(emp);
      }
      this.etudiantsToDisplay = this.etudiants;
    });
  }

  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }
  editEtudiant() {
    this.isEditing = true;
 
  }
  addEtudiant() {
    this.isEditing = false;
    let etudiant: Etudiant = {
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
