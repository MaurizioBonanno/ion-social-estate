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

  profileInfo: any = null;
  profileAvaileble = false;



  constructor(private firebaseAuthService: FirebaseAuthService,
              private widgteUtilService: WidgetUtilService,
              private pfs: ProfiliService) {
    this.getProfile();
  }

  getProfile() {
    this.profileAvaileble = false;
    this.firebaseAuthService.getLoggedInUser().subscribe( user => {
      if (user) {
        this.profileInfo = user.toJSON();

      } else {
        this.profileInfo = null;
      }
      this.profileAvaileble = true;
      console.log('*******Info profilo:', this.profileInfo);
    }, (error) => {
      console.log('error:', error.message);
      this.widgteUtilService.showToast(error.message , 'ERROR');
      this.profileAvaileble = true;
    });
  }

  ngOnInit() {
  }

}
