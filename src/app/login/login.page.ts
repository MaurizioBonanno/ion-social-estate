import { HelperService } from './../providers/helper.service';
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
  showSpinner = false;
  showPageLoader = false;


  validationMessage = {};
  formErrors = {
    email: '',
    password: ''
  };

  constructor(private firebaseAuthService: FirebaseAuthService,
              private router: Router, private widgetUtils: WidgetUtilService,
              private helperService: HelperService) {

                this.showPageLoader = true;
                this.firebaseAuthService.getLoggedInUser().subscribe( user => {
                   if (user) {
                     this.router.navigate(['home']);
                   } else {
                     this.showPageLoader = false;
                   }

                });
               }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  async loginWithEmailAndPassord() {
    try {
      this.showSpinner = true;
      await this.firebaseAuthService.loginWithEmailAndPassword(this.email.value, this.password.value);
      this.showSpinner = false;
      this.widgetUtils.showToast('Login success', 'SUCCESS');
      this.loginForm.reset();
      this.router.navigate(['/home']);
    } catch (error) {
       this.widgetUtils.showToast(error.message, 'ERROR');
       this.showSpinner = false;
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

  onFormValueChanged(result: any) {
     console.log('result:', result);
     const form = this.loginForm;
     // tslint:disable-next-line:forin
     for (const formField in this.formErrors) {
       this.formErrors[formField] = '';
       const control = form.controls[formField];
       if (control && control.dirty && control.invalid) {
         const messageObj = this.validationMessage[formField];
         // tslint:disable-next-line:forin
         for ( const key in control.errors ) {
           // tslint:disable-next-line:no-unused-expression
           this.formErrors[formField] = this.formErrors[formField] + messageObj[key];
         }
       }
     }
  }



  googleLogin() {
     if (this.helperService.isNativePlatfomr()) {
       this.googleNativeLogin();
     } else {
       this.googleLoginWeb();
     }
  }

  async googleNativeLogin() {
     try {
       this.showPageLoader = true;
       await this.firebaseAuthService.googleNativeLogin();
       this.widgetUtils.showToast('Login effettuato con successo' , 'SUCCESS');
       this.showPageLoader = false;
       this.router.navigate(['/home']);
     } catch (error) {
       this.widgetUtils.showToast(error.message, 'ERROR');
     }
  }

  async googleLoginWeb() {
    try {
      await this.firebaseAuthService.googleLoginWeb();
      this.widgetUtils.showToast('Login riuscito con successo', 'SUCCESS');
    } catch ( error ) {
      this.widgetUtils.showToast(error.message, 'ERROR');
    }

  }

}
