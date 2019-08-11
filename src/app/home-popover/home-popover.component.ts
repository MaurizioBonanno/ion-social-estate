import { MenuService } from './../providers/menu.service';
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

  isAdmin = false;
  menuAdmin: Array<any> = [];
  menuAdminAvailable = false;

  constructor(private firebaseAuthService: FirebaseAuthService,
              private widgetUtil: WidgetUtilService,
              private router: Router,
              private ms: MenuService) { }

  ngOnInit() {

    this.isAdmin = this.firebaseAuthService.isAdmin();
    if (this.isAdmin) {
      this.getMenu();
    }
  }

   getMenu() {
    this.menuAdminAvailable = false;
    this.ms.getMenuAdmin().subscribe( result => {
      console.log('Risultati:', result);
      this.menuAdmin = result;
      if (this.menuAdmin.length < 0) {
        this.menuAdminAvailable = false;
      } else {
        this.menuAdminAvailable = true;
      }

    } , (error) => {
      console.log('Errore:', error.message);
      this.widgetUtil.showToast(error.message, 'ERROR');
      this.menuAdminAvailable = true;
    });
  }

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
