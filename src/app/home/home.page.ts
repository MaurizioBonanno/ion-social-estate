import { HelperService } from './../providers/helper.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private helperService: HelperService) {
    console.log('is platorm native', this.helperService.isNativePlatfomr());
  }

}
