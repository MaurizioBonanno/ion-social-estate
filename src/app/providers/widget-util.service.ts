import { HelperService } from './helper.service';

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastController, PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WidgetUtilService {

  constructor(private toastService: ToastrService, private toastController: ToastController, 
              private helperService: HelperService,
              private popoverController: PopoverController) { }

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

  async presentPopover(ev: any, component) {
    const popover = await this.popoverController.create({
      // tslint:disable-next-line:object-literal-shorthand
      component: component,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async dismissPopover() {
    await this.popoverController.dismiss();
  }


}
