import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuariosService } from './usuarios.service';
import { environment } from '../../environments/environment';

const provider = new firebase.auth.GoogleAuthProvider();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usuariosService: UsuariosService) {   }
  // Creacion de usuario e inicio sesion con Google.
  iniciarConGoogle(direccion, telefono){
    const obs$ = firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential as firebase.auth.OAuthCredential;
        // The signed-in user info.
        const user = {
          nombre: result.user.displayName,
          email: result.user.email,
          google: true,
          direccion,
          telefono
        };
        const uid = result.user.uid;
        // ...
        const idToken = credential.idToken;
        this.usuariosService.guardarUsuario(idToken, user, uid);
        Swal.fire({
          title: 'Registrado',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          allowOutsideClick: false
        }).then(() => {
          Swal.close();
          window.open(`${environment.urlsInternas.home}`, '_top');
        });
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
        console.log(errorCode, errorMessage, email, credential, 'Errores en google auth');
  });
    const subcription = from(obs$);
    return subcription;
  }
  registroEmailPassword(email, password){
    const obs$ = firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    const uid = user.uid;
    localStorage.setItem('uid', uid);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
    const subcription = from(obs$);
    return subcription;
  }
  logInEmailPassword(email, password){
    const obs$ = firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    const subcription = from(obs$);
    return subcription;
  }
}
// TODO: Crear el metodo para registrar usuario con correo y contraseña.

