import { WidgetUtilService } from './../providers/widget-util.service';
import { FirestoreDbService } from './../providers/firestore-db.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  showLoaderSpinner = false;

  addProductFormGroup: FormGroup;
  name: FormControl;
  price: FormControl;
  size: FormControl;
  brand: FormControl;

  constructor(private firestoreDbService: FirestoreDbService, private widgetUtilService: WidgetUtilService) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.name = new FormControl('', [
      Validators.required
    ]);
    this.price = new FormControl('', [
      Validators.required
    ]);
    this.size = new FormControl('', [
      Validators.required
    ]);
    this.brand = new FormControl('', [
      Validators.required
    ]);
  }

  createForm() {
    this.addProductFormGroup = new FormGroup({
     name: this.name,
     price: this.price,
     size: this.size,
     brand: this.brand
    });
  }

  async addProduct() {
    this.showLoaderSpinner = true;
    console.log('invio dati:', this.name.value, this.price.value, this.size.value, this.brand.value);
    try {
      await this.firestoreDbService.addProduct({
        name: this.name.value,
        price: this.price.value,
        size: this.size.value,
        brand: this.brand.value,
       });
      this.widgetUtilService.showToast('Articolo aggiunto con successo', 'SUCCESS');
      this.addProductFormGroup.reset();
    } catch ( error ) {
      this.widgetUtilService.showToast(error.message , 'ERROR');
    }
    this.showLoaderSpinner = false;

  }
}
