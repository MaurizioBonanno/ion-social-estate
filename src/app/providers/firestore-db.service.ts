import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreDbService {

  constructor(private db: AngularFirestore) { }

  async addProduct(data) {
    try {
      const result = await this.db.collection('products').add(data);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  getProductList() {
   /* return this.db.collection('products').valueChanges();*/
   return this.db.collection('products').snapshotChanges().pipe(
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

 async getProductById(id: string) {
     try {
      const result = await this.db.collection('products').doc(id).ref.get();
      if (result.exists) {
        return result.data();
      } else {
        throw new Error('Post non esistente');
      }
     } catch (error) {
       throw new Error(error);
     }
  }

  async updateProduct(id, data) {
    try {
       // ALT+96 per accento grave
       const result = await this.db.doc(`products/${id}`).update(data);
       return result;
    // tslint:disable-next-line:one-line
    }catch (error) {
      throw new Error(error);
    }

  }

  async delete(id) {
    try {
      const result = await this.db.doc(`products/${id}`).delete();
      return result;
    // tslint:disable-next-line:whitespace
    } catch(error) {
      throw new Error(error);
    }
  }
}
