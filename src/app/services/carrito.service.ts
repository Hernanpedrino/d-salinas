import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedidos } from '../models/pedidos.models';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  constructor(private firestore: AngularFirestore ) { }
  
}
// TODO: Solucionar la forma de registrar el pedido para poder obtenerlo de mejor forma.
// TODO: Revisar en el curso nuevo de udemy la forma de sumar los pedidos y el trabajo del carrito.
