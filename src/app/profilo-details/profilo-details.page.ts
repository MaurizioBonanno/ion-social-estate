import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfiliService } from '../providers/profili.service';

@Component({
  selector: 'app-profilo-details',
  templateUrl: './profilo-details.page.html',
  styleUrls: ['./profilo-details.page.scss'],
})
export class ProfiloDetailsPage implements OnInit {

  idUser = null;
  userDetail: any = null;

  constructor(private actr: ActivatedRoute, private router: Router, private pfs: ProfiliService) {
    this.actr.params.subscribe(result => {
      this.idUser = result.id;
      this.getDetails();
    });
   }

  ngOnInit() {

  }

  async getDetails() {
    try {
      const result = await this.pfs.getProfiloById(this.idUser);
      this.userDetail = result;
    } catch (error) {
       console.log(error);
    }
  }

}
