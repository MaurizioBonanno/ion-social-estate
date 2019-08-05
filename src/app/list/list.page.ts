import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { Router } from '@angular/router';
import { ProfiliService } from './../providers/profili.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Users } from './../interfaces/users';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

 usersList: Array<any> = [];
 constructor(private pfs: ProfiliService, private router: Router) {

 }


  ngOnInit() {
    this.getListUsers();
  }

  getListUsers() {
    this.pfs.getUsersList().subscribe(result => {
      this.usersList = result;
      console.log('Utenti:', result);
    }, (error) => {
        console.log(error.message);
    });
  }

  openDetailsPage(user){
    this.router.navigate(['/profilo-details', user.uid] );
  }

}
