import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>; 

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })
     }

     googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.updateUserData(credential.user)
        })
    }


    //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.updateUserData(user)
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.updateUserData(user)
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }

    private updateUserData(user) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
      return userRef.set(data)
    }


    signOut() {
      this.afAuth.auth.signOut().then(() => {
          this.router.navigate(['/']);
      });
    }

    /// Shared
  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['profile']);
  }

}
