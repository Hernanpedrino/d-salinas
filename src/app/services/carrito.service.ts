import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Pedidos } from '../models/pedidos.models';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
export interface PedidoId extends Pedidos { id: string; }

@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  private pedidoscollection: AngularFirestoreCollection<Pedidos>;
  pedidos: Observable<PedidoId[]>;
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
    this.pedidoscollection = this.firestore.collection<Pedidos>(`pedidos/${localStorage.getItem('idPedido')}/pedido`);
    // this.pedidos = this.pedidoscollection.snapshotChanges().pipe(
    //   map(actions => {
    //     actions.map(a => {
    //       const data = a.payload.doc.data() as Pedidos;
    //       const id = a.payload.doc.id;
    //       return {data, id};
    //     });
    //   })
    // );
  }
}
