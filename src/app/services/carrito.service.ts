import { Injectable } from '@angular/core';
import 'firebase/firestore';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  constructor(private firestore: AngularFirestore ) { }

  grabarPedido(uid, data){
    const obs$ = this.firestore
    .collection('usuarios')
    .doc(uid)
    .update({
      pedidos: firebase.firestore.FieldValue.arrayUnion(data)
    });
    const subscription = from(obs$);
    return subscription;
  }
}

