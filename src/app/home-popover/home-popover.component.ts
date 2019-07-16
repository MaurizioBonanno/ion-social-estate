import { Router } from '@angular/router';
import { WidgetUtilService } from './../providers/widget-util.service';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {

  constructor(private firebaseAuthService: FirebaseAuthService, private widgetUtil: WidgetUtilService, private router: Router) { }

  ngOnInit() {}

  async logOut() {
    try {
      await this.firebaseAuthService.logOut();
      this.widgetUtil.dismissPopover();
      this.widgetUtil.showToast('Non sei loggato', 'SUCCESS');
      this.router.navigate(['login']);
    } catch (error) {
      this.widgetUtil.showToast(error.message, 'ERROR');
    }

  }

  openProfilePage() {
    this.router.navigate(['/profile']);
    this.widgetUtil.dismissPopover();
  }

}
