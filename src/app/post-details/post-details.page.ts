import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WidgetUtilService } from './../providers/widget-util.service';
import { FirestoreDbService } from './../providers/firestore-db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  showLoader = false;
  postId = '';
  postDetail: any = null;
  showEditPostForm = false;
  showLoadSpinner = false;

  updateForm: FormGroup;

  name: FormControl;
  price: FormControl;
  size: FormControl;
  brand: FormControl;

  constructor(private activatedRoute: ActivatedRoute, private firestoreDbService: FirestoreDbService,
              private widgetUtil: WidgetUtilService,
              private router: Router) {
    this.activatedRoute.params.subscribe( result => {
       console.log('Dettaglio:', result);
       this.postId = result.id;
       this.getDetails();
    });
   }

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
    this.updateForm = new FormGroup({
      name: this.name,
      price: this.price,
      size: this.size,
      brand: this.brand,
    });
  }

  async getDetails() {
    this.showLoader = true;
    try {
     const result = await this.firestoreDbService.getProductById(this.postId);
     this.postDetail = result;
     console.log(result);
    } catch (error) {
      console.log(error);
      this.widgetUtil.showToast(error.message , 'ERROR');
    }
    this.showLoader = false;
  }

  openEditPost() {
   this.showEditPostForm = true;
   this.updateForm.reset();
   this.updateForm.controls.name.setValue(this.postDetail.name);
   this.updateForm.controls.price.setValue(this.postDetail.price);
   this.updateForm.controls.size.setValue(this.postDetail.size);
   this.updateForm.controls.brand.setValue(this.postDetail.brand);

  }

  async update() {
    this.showLoadSpinner = true;
    try {

      const updateDetail = {
         name: this.updateForm.controls.name.value,
         price: this.updateForm.controls.price.value,
         size: this.updateForm.controls.size.value,
         brand: this.updateForm.controls.brand.value
      };

      await this.firestoreDbService.updateProduct(this.postId, updateDetail);
      this.widgetUtil.showToast('Aggiornamento riuscito', 'SUCCESS');
      this.showLoadSpinner = false;
      this.getDetails();
      this.cancel();
     } catch (error) {
       this.widgetUtil.showToast(error.message, 'ERROR');
       this.showLoadSpinner = false;
     }
  }

  cancel() {
    this.showEditPostForm = false;
  }

  delete() {
    this.widgetUtil.presentAlertConfirm(
      'Eliminare?',
      `Vuoi davvero eliminare ${this.postDetail.name}?`,
      [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('operazione annullata');
          }
        },
        {
          text: 'SI',
          // tslint:disable-next-line:whitespace
          handler: async ()=> {
            try {
            await this.firestoreDbService.delete(this.postId);
            this.widgetUtil.showToast('elemento cancellato con successo', 'SUCCESS');
            this.router.navigate(['/home']);
            console.log('cancellato?');
            } catch (error) {
              this.widgetUtil.showToast(error.message, 'ERROR');
            }
          }
        }
      ]
    );
  }



}
