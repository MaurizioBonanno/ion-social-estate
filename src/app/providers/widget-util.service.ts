
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WidgetUtilService {

  constructor(private toastService: ToastrService) { }

  showToast(message, title){
    if (title === 'SUCCESS') {
    this.toastService.success(message, title);
    } else if ( title === 'ERROR'){
      this.toastService.error(message, title);
    }
  }
}
