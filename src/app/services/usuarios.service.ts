import { Injectable } from '@angular/core';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuarios } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { }
  obtenerUsuarioActivo(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // No user is signed in.
        console.log('No hay usuario logueado');
        return;
      } else {
        // User is signed in.
        if (user.providerData[0].providerId === 'google.com') {
          const nombre = user.displayName;
          console.log(nombre, user);
        }
      }
    });
  }
  crearUsuario(usuario: Usuarios){
    // TODO: Verificar que el usuario aun no este registrado.
    this.firestore.collection('usuarios').add(usuario);
  }
}
