import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Helados } from '../models/helados.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';




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
  //FIXME:  obtenerDocumentoId(){
  //   return this.firestore.doc('baldes/630JIm8Fuvl5r4upqnTF').get()
  // }
//TODO: Hernan tenes que hacer el metodo para obtener cada producto como esta arriba e implementaar un switch
}

