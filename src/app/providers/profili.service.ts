import { Users } from './../interfaces/users';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfiliService {


  constructor(private db: AngularFirestore) { }

  async getProfiloById(uid: string) {
    try {
      const result = await this.db.collection('profili').doc(uid).ref.get();
      if (result.exists) {
        return result.data();
      } else {
        throw new Error('Profilo non esistente');
      }
     } catch (error) {
       throw new Error(error);
     }
  }

  getUsers() {
    return this.db.collection('profili').snapshotChanges().pipe(
      map( profilo => {
        return profilo.map( a => {
          const data = a.payload.doc.data() as Users;
          const id = a.payload.doc.id;
          return { id , ...data };
        });
      })
    );
  }

  getUsersList() {
    /* return this.db.collection('products').valueChanges();*/
    return this.db.collection('profili').snapshotChanges().pipe(
      map(docArray => {
        return docArray.map( doc => {
          console.log('doc.payload.doc:', doc.payload.doc);
          console.log('doc.payload.doc.data:', doc.payload.doc.data());
          return({
           id: doc.payload.doc.id,
           ...doc.payload.doc.data()
          });
        });
      })
    );
   }


   async getUserById(id: string) {
    try {
     const result = await this.db.collection('profili').doc(id).ref.get();
     if (result.exists) {
       return result.data();
     } else {
       throw new Error('Post non esistente');
     }
    } catch (error) {
      throw new Error(error);
    }
 }

 async updateProfile(id: string, data: any) {
   try {
      const result = await this.db.doc(`profili/${id}`).update(data);
      return result;
   } catch (error) {
     throw new Error(error);
   }
 }

}
