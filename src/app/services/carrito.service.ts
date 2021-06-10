import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedidos } from '../models/pedidos.models';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  constructor(private firestore: AngularFirestore ) { }
  agregarPedido(pedido: Pedidos){
    const pedidoRef = this.firestore.collection('usuarios/pedidos/0');
    const itemRef = this.firestore.collection('usuarios/pedidos/0/items/0');
    if (pedidoRef.snapshotChanges.length === null){
      this.firestore.collection(`${itemRef}/item`).doc('0').set(`${pedido}`);
    }
    return this.firestore.collection(``)
  }
}
// TODO: Solucionar la forma de registrar el pedido para poder obtenerlo de mejor forma.
// TODO: Revisar en el curso nuevo de udemy la forma de sumar los pedidos y el trabajo del carrito.
