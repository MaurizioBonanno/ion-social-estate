import { WidgetUtilService } from './../providers/widget-util.service';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm: FormGroup;
  email: FormControl;
  password: FormControl;

  // tslint:disable-next-line:no-inferrable-types
  showSignupSpinner: boolean = false;

  constructor(private firebaseAuthservice: FirebaseAuthService, 
              private widgetUtilService: WidgetUtilService,
              private router: Router) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.email = new FormControl('',[
      Validators.email,
      Validators.required
    ]);

    this.password = new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]);
 }

 createForm() {
   this.signUpForm = new FormGroup({
     email: this.email,
     password: this.password
     });

     // tslint:disable-next-line:align
     this.signUpForm.valueChanges.subscribe(result => this.onFormValueChanged(result));

  }

  onFormValueChanged(result: any){
    console.log('result:', result);
    const form = this.signUpForm;
    // tslint:disable-next-line:forin
 }

 async registerWithEmailAndPassword() {
   try{
     //visualizzo spinner
     this.showSignupSpinner = true;
// tslint:disable-next-line: prefer-const
     let result = await this.firebaseAuthservice.registerWithEmailAndPassword(this.email.value, this.password.value);
     this.widgetUtilService.showToast('Utente creato con successo, email di verifica inviata', 'SUCCESS');
     this.showSignupSpinner = false;
     //reindirizzo alla home
     this.router.navigate(['/home']);
   } catch ( error ){
     this.widgetUtilService.showToast('Errore:' + error.message, 'ERROR');
     this.showSignupSpinner = false;
     console.log('error', error);
   }

 }

}
