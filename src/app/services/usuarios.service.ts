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
  crearUsuario(usuario: Usuarios){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.firestore.collection('usuarios').add(usuario);
      } else {
        // No user is signed in.
        console.log('No hay usuario logueado');
      }
    });
  }
}
