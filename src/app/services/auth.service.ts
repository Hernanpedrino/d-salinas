import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {   }
  nuevoUsuario(email: string, password: string){
    const createObs$ = firebase.auth().createUserWithEmailAndPassword(email, password);
    const subscription = from(createObs$);
    return subscription;
  }
  inicioSesionConEmailPassword(email: string, password: string){
    const createObs$ = firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    const subscription = from(createObs$);
    return subscription;
  }
  inicioSesionGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const createObs$ = firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;
      // The signed-in user info.
      const user = result.user;
      console.log('Credenciales: ', credential, 'Usuario: ', user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.log(errorCode, errorMessage, email, credential);
    });
    const subscription = from(createObs$);
    return subscription;
  }
  logout(){
    const createObs$ = firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    const subscription = from(createObs$);
    return subscription;
  }
}

