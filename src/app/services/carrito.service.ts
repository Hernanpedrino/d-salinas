import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { delay, map } from 'rxjs/operators';
import { Pedidos } from '../models/pedidos.models';
import {  v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  constructor(private firestore: AngularFirestore ) { }
  private idItemPedido;
  agregarItemPedido(item: Pedidos){
    const idParaPedido = uuidv4();
    if (localStorage.getItem('idPedido') === null) {
      localStorage.setItem('idPedido', JSON.stringify(idParaPedido));
    }
    this.firestore.collection(`pedidos/${localStorage.getItem('idPedido')}/pedido`).doc(`${localStorage.getItem('idPedido')}`).set(item),
    delay(2000);
  }
  obtenerPedido(){
     return this.firestore.collection<Pedidos>(`pedidos/${localStorage.getItem('idPedido')}/pedido`).valueChanges();
  }
  obtenerItemDelPedido(){
    return this.firestore.collection<Pedidos>(`pedidos/${localStorage.getItem('idPedido')}/pedido`).snapshotChanges().pipe(
      map( actions => actions.map(a => {
        const data: Pedidos = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.idItemPedido = id;
        const subTotalserv = a.payload.doc.data().cantidad * a.payload.doc.data().precio;
        return {data, id, subTotalserv};
      }))
    );
  }
  borrarPedido(){
    this.firestore.collection('pedidos').doc(`${localStorage.getItem('idPedido')}/pedido/${localStorage.getItem('idPedido')}`).delete();
  }
}
