
import { Users } from './../interfaces/users';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  utente: any;

  constructor(private angularFireAuth: AngularFireAuth,
              private googlePlus: GooglePlus,
              private helperService: HelperService,
              private router: Router,
              private afs: AngularFirestore) {
    this.angularFireAuth.authState.subscribe( user => {
      console.log('Firebase auth service , user:', user ? user.toJSON() : user);
      if (user) {
        console.log('--------SONO NEL COSTRUTTORE TROVA UTENTE-----');
        this.registerUserOnFirestore(user);
      }

      if (!user ) {
        this.router.navigate(['/login']);
      }
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
          if (this.helperService.isNativePlatfomr()) {
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
       webClientId: '655074127481-7kd8pqga5u0rpan3sjc78r1omt6fkdlp.apps.googleusercontent.com',
       offline: true
     });

     // tslint:disable-next-line: deprecation
     await this.angularFireAuth.auth.signInAndRetrieveDataWithCredential(auth.GoogleAuthProvider.credential(result.idToken));
     return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async googleNativeLogout() {
      await this.googlePlus.logout();
  }

  async registerUserOnFirestore(user) {

    await this.afs.doc(`profili/${user.uid}`).ref.get().then(dc => {
      if (dc.exists) {
        console.log('----------UTENTE TROVATO----------');
        this.utente = dc.data();
        console.log('ADMIN------', this.isAdmin());
      } else {
        const us: Users = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          roles: {
            admin: false,
            subscriber: true
          }
        };
        return this.afs.doc(`profili/${user.uid}`).set(us, {merge: true});
      }
    });

  }

  getMyUtente() {
    try {
     if (this.utente) {
       return this.utente;
     }
    } catch (error) {
      throw new Error(error);
    }
  }

  getMyRoles() {
    try {
      if (this.utente) {
        return this.utente.roles;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  isAdmin() {
    return this.utente.roles.admin;
  }

}
