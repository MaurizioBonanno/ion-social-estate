import { HelperService } from './helper.service';

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WidgetUtilService {

  constructor(private toastService: ToastrService, private toastController: ToastController, 
              private helperService: HelperService) { }

  showToast(message, title){
    if (this.helperService.isNativePlatfomr) {

      this.showNativeToast(message);

    } else {
          if (title === 'SUCCESS') {
              this.toastService.success(message, title);
          } else if ( title === 'ERROR'){
              this.toastService.error(message, title);
         }
    }

  }

  async showNativeToast(message){
    const toast = await this.toastController.create({
      // tslint:disable-next-line:object-literal-shorthand
      message: message,
      duration: 2000
    });
    toast.present();
  }


}
