import { Injectable, NgZone, } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private zone: NgZone
              ) {   }
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
    .signInWithPopup(provider);
    const subscription = from(createObs$);
    this.router.navigateByUrl('/home'), delay(3000);
    return subscription;
  }
  logout(){
    localStorage.removeItem('uid');
    const createObs$ = firebase.auth().signOut().then(() => {
      // Sign-out successful.
      Swal.fire({
        icon: 'success',
        title: 'Sesion Cerrada',
        text: 'Muchas gracias por tu visita!'
      });
      this.router.navigateByUrl('/home'), delay(9000);
    }).catch((error) => {
      // An error happened.
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:  `Ocurrio un error al cerrar la sesion: ${error}`
      });
    });
    const subscription = from(createObs$);
    return subscription;
  }
}

