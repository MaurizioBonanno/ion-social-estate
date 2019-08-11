import { MenuService } from './providers/menu.service';
import { FirebaseAuthService } from './providers/firebase-auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'Utenti',
      url: '/list',
      icon: 'list'
    }
  ];

  isLoggedIn = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseAuthService: FirebaseAuthService,
    private ms: MenuService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkUser();
    });
  }


  checkUser() {
     this.firebaseAuthService.getLoggedInUser().subscribe( user => {
       if (user) {
         this.isLoggedIn = true;
         console.log('Utente autenticato , console di app component');
       } else {
         this.isLoggedIn = false;
         console.log('Utente non autenticato , console di app component');
       }
     });
  }
}
