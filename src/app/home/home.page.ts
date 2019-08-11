import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FirestoreDbService } from './../providers/firestore-db.service';
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

  productsList: Array<any> = [];
  productListAvailable = false;

  constructor(private helperService: HelperService,
              private widgetUtil: WidgetUtilService,
              private router: Router,
              private firebaseAuthService: FirebaseAuthService,
              private firestoreDbService: FirestoreDbService) {


            this.getProductList();

            console.log('is platorm native', this.helperService.isNativePlatfomr());


  }

  getProductList() {
    this.productListAvailable = false;
    this.firestoreDbService.getProductList().subscribe( result => {
      console.log('Risultati:', result);
      this.productsList = result;
      this.productListAvailable = true;
    } , (error) => {
      console.log('Errore:', error.message);
      this.widgetUtil.showToast(error.message, 'ERROR');
      this.productListAvailable = true;
    });
  }

  async openPopover(event) {
    await this.widgetUtil.presentPopover(event, HomePopoverComponent);
  }

  openDetailsPage(product) {
    this.router.navigate(['/post-details', product.id]);
  }

  doRefresh(event) {
    this.getProductList();
    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
