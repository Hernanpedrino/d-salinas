import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  constructor(private firestore: AngularFirestore ) { }
  agregarPedido(pedido: any){
    const uid = localStorage.getItem('uid');
    let pedidoId = 0;
    if (this.firestore.collection(`usuarios/${uid}/pedidos`).valueChanges.length > 0) {
      pedidoId = this.firestore.collection(`usuarios/${uid}/pedidos`).valueChanges.length + 1;
    }
    return this.firestore.collection(`usuarios/${uid}/pedidos`).doc(`${pedidoId}`).set(pedido);
  }
}
// TODO: Solucionar la forma de registrar el pedido para poder obtenerlo de mejor forma.
// TODO: Revisar en el curso nuevo de udemy la forma de sumar los pedidos y el trabajo del carrito.
