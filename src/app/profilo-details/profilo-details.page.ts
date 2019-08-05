import { WidgetUtilService } from './../providers/widget-util.service';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfiliService } from '../providers/profili.service';

@Component({
  selector: 'app-profilo-details',
  templateUrl: './profilo-details.page.html',
  styleUrls: ['./profilo-details.page.scss'],
})
export class ProfiloDetailsPage implements OnInit {

  idUser = null;
  userDetail: any = null;
  isAdmin = false;
  showLoadSpinner = false;
  showForm = false;
  updateForm: FormGroup;
  nome: FormControl;
  mail: FormControl;
  admin: FormControl;
  sub: FormControl;

  constructor(private actr: ActivatedRoute, private router: Router,
              private fas: FirebaseAuthService,
              private pfs: ProfiliService,
              private widgetUtisService: WidgetUtilService) {
    this.actr.params.subscribe(result => {
      this.idUser = result.id;
      this.getDetails();
    });
    this.createFormControl();
    this.createFormGroup();
   }

  ngOnInit() {
   this.isAdmin = this.fas.isAdmin();
  }

  async getDetails() {
    try {
      const result = await this.pfs.getProfiloById(this.idUser);
      this.userDetail = result;
    } catch (error) {
       console.log(error);
    }
  }

  cancel() {
    this.showForm = false;
  }

  async update() {
    try {
    this.showLoadSpinner = true;

    const updateDetails = {
      displayName: this.updateForm.controls.nome.value,
      email: this.updateForm.controls.mail.value,
      roles: {
        admin: this.updateForm.controls.ad.value,
        subscriber: this.updateForm.controls.subs.value
      }
    };
    await this.pfs.updateProfile(this.idUser , updateDetails);
    this.showLoadSpinner = false;
    this.widgetUtisService.showToast('Utente modificato con successo', 'SUCCESS');
    this.showForm = false;
    this.getDetails();
     } catch (error) {
       console.log(error);
       this.widgetUtisService.showToast('Errore nella modifica dei dati', 'ERROR');
     }
  }

  showUpdateForm() {
    this.showForm = true;
    this.updateForm.reset();
    this.updateForm.controls.nome.setValue(this.userDetail.displayName);
    this.updateForm.controls.mail.setValue(this.userDetail.email);
    this.updateForm.controls.ad.setValue(this.userDetail.roles.admin);
    this.updateForm.controls.subs.setValue(this.userDetail.roles.subscriber);
  }

  createFormControl() {
    this.nome = new FormControl('', [
      Validators.required
    ]);

    this.mail = new FormControl('', [
      Validators.required
    ]);

    this.admin = new FormControl('', [
      Validators.required
    ]);

    this.sub = new FormControl('', [
      Validators.required
    ]);
  }

  createFormGroup() {
    this.updateForm = new FormGroup( {
      nome: this.nome,
      mail: this.mail,
      ad: this.admin,
      subs: this.sub
    });
  }

}
