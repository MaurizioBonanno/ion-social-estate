import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private platform: Platform) { }

  isNativePlatfomr() {
    return (this.platform.is('cordova') || this.platform.is('capacitor'))
  }
}
