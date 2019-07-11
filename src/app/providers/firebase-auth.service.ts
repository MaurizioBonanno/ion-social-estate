import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState.subscribe( user => {
      console.log('Firebase auth service , user:', user ? user.toJSON() : user);
    });
   }

   getLoggedInUser(){
     return this.angularFireAuth.authState;
   }

  async registerWithEmailAndPassword(email, password){
    // tslint:disable-next-line:prefer-const
    try{
    const result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    await this.angularFireAuth.auth.currentUser.sendEmailVerification();
    return result;
    } catch (error){
      throw new Error(error);
    }
  }

  async loginWithEmailAndPassword(email, password){
    try{
      const result = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
      return result;
    } catch(error){
      throw new Error(error);
    }

  }

  async logOut() {
    try {
          const result = this.angularFireAuth.auth.signOut();
          return result ;
         } catch (error) {
         throw new Error(error);
       }
  }

  async googleLoginWeb(){
    try {
      const result = await this.angularFireAuth.auth.signInWithRedirect( new auth.GoogleAuthProvider());
      return result;
    } catch ( error ) {
      throw new Error(error);
    }

  }
}
