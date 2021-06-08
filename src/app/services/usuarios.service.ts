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
        return;
      } else {
        // User is signed in.
        if (user.providerData[0].providerId === 'google.com') {
          localStorage.setItem('uid', user.uid);
          return user;
        } else {
          this.firestore.collection<Usuarios>('usuarios').doc(`${user.uid}`).valueChanges().subscribe(resp => {
            localStorage.setItem('uid', user.uid);
            return resp;
          });
        }
      }
    });
  }
  agregarUsuario(usuario: Usuarios, uid: string){
    this.firestore.collection<Usuarios>('usuarios').doc(uid).set(usuario);
    console.log(usuario);
  }
  obtenerUsuarioBd(){
    const uid = localStorage.getItem('uid');
    return this.firestore.collection<Usuarios>(`usuarios`).doc(`${uid}`).valueChanges();
  }
}
