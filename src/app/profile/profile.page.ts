import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WidgetUtilService } from './../providers/widget-util.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import { ProfiliService } from '../providers/profili.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  updateForm: FormGroup;
  name: FormControl;
  email: FormControl;



  profileAvaileble = false;
  showEditProfileForm = false;
  showLoadSpinner = false;

  utente: any = null;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private widgteUtilService: WidgetUtilService,
              private pfs: ProfiliService) {
   // this.getProfile();
    this.getUtente();
  }

   getUtente() {
    try {
     this.firebaseAuthService.getLoggedInUser().subscribe( us => {
       if (us) {
      console.log('ID---------', us.uid);
      const result = this.pfs.getProfiloById(us.uid);
      this.utente = result;
      this.profileAvaileble = true;
       }
     });
    } catch (error) {
      console.log(error);
      this.widgteUtilService.showToast('Utente non esistente', 'ERROR');
    }
  }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.name = new FormControl('', [
      Validators.required
    ]);
    this.email = new FormControl('', [
      Validators.required
    ]);

  }

  createForm() {
    this.updateForm = new FormGroup(
      {
        nome: this.name,
        mail: this.email
      }
    );

  }

  openEditProfilo() {
     this.showEditProfileForm = true;
     this.updateForm.reset();
     this.updateForm.controls.nome.setValue(this.utente.__zone_symbol__value.displayName);
     this.updateForm.controls.mail.setValue(this.utente.__zone_symbol__value.email);
  }

  cancel() {
    this.showEditProfileForm = false;
  }

  async update() {

    const updateProfile = {
      displayName: this.updateForm.controls.nome.value,
      email: this.updateForm.controls.mail.value
    };
    try {
    await  this.pfs.updateProfile(this.utente.__zone_symbol__value.uid, updateProfile);
    this.widgteUtilService.showToast('Modifica avvenuta con successo', 'SUCCESS');
    this.showLoadSpinner = false;
    this.showEditProfileForm = false;
    this.profileAvaileble = false;
    this.getUtente();

   } catch (error) {
     this.widgteUtilService.showToast(error, 'ERRORE');
   }

  }

}
