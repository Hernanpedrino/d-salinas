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
    const subcription = from(obs$);
    return subcription;
  }
}
