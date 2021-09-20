import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  private url = 'https://identitytoolkit.googleapis.com/v1';
  constructor(private usuariosService: UsuariosService,
              private http: HttpClient) {   }
  // Creacion de usuario e inicio sesion con Google.
  registrarConGoogle(direccion, telefono){
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
        const idToken = credential.idToken;
        const nombre = result.user.displayName;
        localStorage.setItem('uid', uid);
        localStorage.setItem('usuario', JSON.stringify(user));
        localStorage.setItem('nombre', nombre);
        this.usuariosService.guardarUsuario(idToken, user, uid);
        Swal.fire({
          title: 'Registrado',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          allowOutsideClick: false
        }).then(() => {
          Swal.close();
          window.open(`${environment.urlsInternas.home}`, '_top');
          window.location.reload();
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
  iniciarConGoogle(){
    const obs$ = firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        // const credential = result.credential as firebase.auth.OAuthCredential;
        // The signed-in user info.
        const uid = result.user.uid;
        const nombre = result.user.displayName;
        this.usuariosService.obtenerUsuario(uid).subscribe(resp => {
          if (resp){
            const datosUsuario = {
              // tslint:disable-next-line: no-string-literal
              usuario: resp['usuario']
            };
            localStorage.setItem('uid', uid);
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('usuario', JSON.stringify(datosUsuario));
            Swal.fire({
              title: 'Bienvenido a Distribuidora Salinas',
              icon: 'success',
              allowOutsideClick: false
            }).then(() => {
              Swal.close();
              window.open(`${environment.urlsInternas.home}`, '_top');
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: 'Usuario no registrado',
              text: 'Por favor complete el formulario de registro',
              icon: 'error',
              allowOutsideClick: false
            }).then(() => {
              Swal.close();
              window.open(`${environment.urlsInternas.registrarse}`, '_top');
              window.location.reload();
            });
          }
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

  registroEmailPassword(email: string, password: string){
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}/accounts:signUp?key=${environment.firebase.apiKey}`,
      authData
    );
  }
  logInEmailPassword(email, password){
    const authData = {
      email,
      password
    };
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
      authData
    );
  }
  usuarioAutenticado(): boolean {
    const user = firebase.auth().currentUser;
    if (user) {
    // User is signed in, see docs for a list of available properties
    // TODO: Aca verificar el token y la sesion
      return true;
    } else {
    // No user is signed in.
      return false;
    }
  }
  // usuarioAdmin(): boolean {
  //   const user = firebase.auth().currentUser;
  //   if (user) {
  //   // User is signed in, see docs for a list of available properties
  //   // TODO: Verificar que el usuario sea el administrador
  //     return true;
  //   } else {
  //   // No user is signed in.
  //     return false;
  //   }
  // }
  logOut(){
    firebase.auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      Swal.fire({
        title: 'Sesion cerrada',
        text: 'Muchas gracias por tu visita',
        icon: 'success',
        allowOutsideClick: false
      });
      window.open(`${environment.urlsInternas.home}`, '_top');
      localStorage.clear();
    }).catch((error) => {
      // An error happened.
    });
  }
}

