import { WidgetUtilService } from './../providers/widget-util.service';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { HelperService } from './../providers/helper.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private helperService: HelperService,
              private widgetUtil: WidgetUtilService,
              private router: Router, private firebaseAuthService: FirebaseAuthService) {
    console.log('is platorm native', this.helperService.isNativePlatfomr());
  }

  async logOut() {
    try {
      await this.firebaseAuthService.logOut();
      this.widgetUtil.showToast('Non sei loggato', 'SUCCESS');
      this.router.navigate(['login']);
    } catch (error) {
      this.widgetUtil.showToast(error.message, 'ERROR');
    }

  }

}
