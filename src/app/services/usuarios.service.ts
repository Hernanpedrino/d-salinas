import { Injectable } from '@angular/core';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuarios } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public nombre = '';
  public apellido = '';
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
          const uid = user.uid;
          console.log(nombre, uid);
          return nombre && uid;
        } else {
          this.firestore.collection<Usuarios>('usuarios').doc(`${user.uid}`).valueChanges().subscribe(resp => {
            const nombre = resp.nombre;
            const apellido = resp.apellido;
            console.log(nombre, apellido);
            this.nombre = nombre;
            this.apellido = apellido;
          });
        }
      }
    });
  }
  agregarUsuario(usuario: Usuarios, uid: string){
    this.firestore.collection<Usuarios>('usuarios').doc(uid).set(usuario);
    console.log(usuario);
  }
}
