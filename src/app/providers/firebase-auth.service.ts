import { HelperService } from './helper.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private googlePlus: GooglePlus,
              private helperService: HelperService) {
    this.angularFireAuth.authState.subscribe( user => {
      console.log('Firebase auth service , user:', user ? user.toJSON() : user);
    });
   }

   getLoggedInUser() {
     return this.angularFireAuth.authState;
   }

  async registerWithEmailAndPassword(email, password) {
    // tslint:disable-next-line:prefer-const
    try {
    const result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    await this.angularFireAuth.auth.currentUser.sendEmailVerification();
    return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginWithEmailAndPassword(email, password) {
    try {
      const result = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      throw new Error(error);
    }

  }

  async logOut() {
    try {
          const result = this.angularFireAuth.auth.signOut();
          if (this.helperService.isNativePlatfomr()){
             this.googleNativeLogout();
          }
          return result ;
         } catch (error) {
         throw new Error(error);
       }
  }

  async googleLoginWeb() {
    try {
      const result = await this.angularFireAuth.auth.signInWithRedirect( new auth.GoogleAuthProvider());
      return result;
    } catch ( error ) {
      throw new Error(error);
    }

  }

  async googleNativeLogin() {
    try {
     const result = await this.googlePlus.login({
       'webClientId': '655074127481-7kd8pqga5u0rpan3sjc78r1omt6fkdlp.apps.googleusercontent.com',
       'offline': true
     });

     // tslint:disable-next-line: deprecation
     await this.angularFireAuth.auth.signInAndRetrieveDataWithCredential(auth.GoogleAuthProvider.credential(result.idToken));
     return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async googleNativeLogout(){
      await this.googlePlus.logout();
  }



}
