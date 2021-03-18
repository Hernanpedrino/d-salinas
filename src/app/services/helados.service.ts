import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Helados } from '../models/helados.model';
import { ActivationEnd,  Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeladosService {
  private href: string;
  public tipoProdHref: String;
  constructor(private firestore: AngularFirestore,
              private router: Router) {
      this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event:any)=> event.snapshot.data)
      )
      .subscribe(data=>{
        this.tipoProdHref = data.producto
      });
  }
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
    return this.firestore.collection<Helados>(`${this.tipoProdHref}`).doc(`${id}`).get()
  }
}