import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  async registerWithEmailAndPassword(email, password){
    // tslint:disable-next-line:prefer-const
    try{
    let result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    await this.angularFireAuth.auth.currentUser.sendEmailVerification();
    return result;
    } catch (error){
      throw new Error(error);
    }
  }
}
