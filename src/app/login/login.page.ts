import { WidgetUtilService } from './../providers/widget-util.service';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgControlStatus } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  validationMessage = {};
  formErrors = {
    email: '',
    password: ''
  };

  constructor(private firebaseAuthService: FirebaseAuthService,
              private router: Router, private widgetUtils: WidgetUtilService) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  async loginWithEmailAndPassord(){
    try{
      await this.firebaseAuthService.loginWithEmailAndPassword(this.email.value, this.password.value);
      this.widgetUtils.showToast('Login success', 'SUCCESS');
      this.loginForm.reset();
      this.router.navigate(['/home']);
    } catch (error) {
       this.widgetUtils.showToast(error.message, 'ERROR');
    }
  }

  createFormControl() {
     this.email = new FormControl('', [
       Validators.email,
       Validators.required
     ]);

     this.password = new FormControl('', [
       Validators.required,
       Validators.minLength(5)
     ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });

    this.loginForm.valueChanges.subscribe(result => this.onFormValueChanged(result));
  }

  onFormValueChanged(result: any){
     console.log('result:', result);
     const form = this.loginForm;
     // tslint:disable-next-line:forin
     for (const formField in this.formErrors){
       this.formErrors[formField] = '';
       const control = form.controls[formField];
       if (control && control.dirty && control.invalid) {
         const messageObj = this.validationMessage[formField];
         // tslint:disable-next-line:forin
         for ( const key in control.errors ){
           // tslint:disable-next-line:no-unused-expression
           this.formErrors[formField] = this.formErrors[formField] + messageObj[key];
         }
       }
     }
  }

  createValidationMessage() {
    this.validationMessage = {
      email: {
        email: 'Email deve essere valida',
        required: 'email è richiesta'
      },
      password : {
        minLength: 'minimo 5 caratteri',
        required: 'password è richiesta'
      }
    }
  }

}
