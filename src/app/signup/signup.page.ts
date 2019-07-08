import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private firebaseAuthservice: FirebaseAuthService) { }

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
     let result = await this.firebaseAuthservice.registerWithEmailAndPassword(this.email.value, this.password.value);
     console.log('result', result);
   } catch ( error ){
     console.log('error',error);
   }
   
 }

}
