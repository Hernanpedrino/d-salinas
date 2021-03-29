import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedidos } from '../models/pedidos.models';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  constructor(private firestore: AngularFirestore ) { }
  agregarItemPedido(item: Pedidos){
    const idParaPedido = uuidv4();
    if (localStorage.getItem('idPedido') === null) {
      localStorage.setItem('idPedido', JSON.stringify(idParaPedido));
    }
    this.firestore.collection(`pedidos/${localStorage.getItem('idPedido')}/pedido`).doc().set(item);
  }
  obtenerPedido(){
     return this.firestore.collection<Pedidos>(`pedidos/${localStorage.getItem('idPedido')}/pedido`).valueChanges();
  }
  borrarPedido(){
    this.firestore.collection('pedidos').doc(`${localStorage.getItem('idPedido')}`).delete();
  }
  obtenerItemDelPedido(){
    return this.firestore.collection<Pedidos>(`pedidos/${localStorage.getItem('idPedido')}/pedido`).snapshotChanges().pipe(
      map( actions => actions.map(a => {
        const data: Pedidos = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {data, id};
      }))
    );
  }
}
