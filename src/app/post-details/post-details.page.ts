import { WidgetUtilService } from './../providers/widget-util.service';
import { FirestoreDbService } from './../providers/firestore-db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private activatedRoute: ActivatedRoute, private firestoreDbService: FirestoreDbService,
              private widgetUtil: WidgetUtilService) {
    this.activatedRoute.params.subscribe( result => {
       console.log('Dettaglio:', result);
       this.postId = result.id;
       this.getDetails();
    });
   }

  ngOnInit() {
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
  }

}
