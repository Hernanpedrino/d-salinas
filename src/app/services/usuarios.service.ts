import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { }
  // Metodo para guardar el usuario en la bd.
  guardarUsuario(idToken, usuario, uid){
    const obs$ = this.firestore
      .collection('usuarios')
      .doc(`${uid}`)
      .set({
        idtoken: idToken,
        usuario
      });
    const subscription = from(obs$);
    return subscription;
  }
  obtenerUsuario(uid) {
    // Antes de obtener el usuario verificar si hay sesion
    const obs$ = this.firestore
    .collection('usuarios')
    .doc(`${uid}`)
    .valueChanges();
    const subscription = from(obs$);
    return subscription;
  }
}
