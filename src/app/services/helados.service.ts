import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Helados } from '../models/helados.model';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HeladosService {

  
  private href: string = '';
  
  constructor(private firestore: AngularFirestore,
              private router: Router) { }
  
  obtenerColeccionesFb(){
    this.href = this.router.url
    return this.firestore.collection<Helados>(`${this.href}`)
    .valueChanges()
  }
  obtenerOfertasBaldesFb(){
    return this.firestore.collection<Helados>('baldes', ref => ref.where('oferta','==', true))
    .valueChanges()
  }
  obtenerOfertasPostresFb(){
    return this.firestore.collection<Helados>('postres-helados', ref => ref.where('oferta','==', true))
    .valueChanges()
  }
  obtenerOfertasGolosinasFb(){
    return this.firestore.collection<Helados>('golosinas-heladas', ref => ref.where('oferta','==', true))
    .valueChanges()
  }
  obtenerOfertastaccFb(){
    return this.firestore.collection<Helados>('productos-sin-tacc', ref => ref.where('oferta','==', true))
    .valueChanges()
  }
  obtenerDocumentoId(id:string){
     return this.firestore.collection('baldes').doc(`${id}`).get()
  }
//TODO: Hernan tenes que hacer el metodo para obtener cada producto como esta arriba e implementaar un switch para que quede prolijo y en un solo metodo
}
