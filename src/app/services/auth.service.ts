import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

const provider = new firebase.auth.GoogleAuthProvider();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {   }
  // Creacion de usuario e inicio sesion con Google.
  iniciarConGoogle(){
    const obs$ = firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential as firebase.auth.OAuthCredential;
        // The signed-in user info.
        const user = firebase.auth().currentUser;
        const idToken = credential.idToken;
        console.log(user, idToken, 'Aca ya tenemos el token');
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
        console.log(errorCode, errorMessage, email, credential, 'Errores en google auth');
  });
    const subcription = from(obs$);
    return subcription;
  }

}

// TODO: Hay que procesar el toquen y guardarlo en el usuario de base de datos.
// Ademas hay que guardar la informacion del perfil.
