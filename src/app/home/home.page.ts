import { HomePopoverComponent } from './../home-popover/home-popover.component';
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



  async openPopover(event){
    await this.widgetUtil.presentPopover(event, HomePopoverComponent);
  }

}
