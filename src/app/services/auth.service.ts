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
    const createObs$ = firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
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
}
// TODO: Solucionar la verificacion por correo electronico para que sea mas seguro.
// TODO: Implementar el inicio de sesion con google.
