import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Helados } from '../models/helados.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeladosService {

  private href: string = '';
  items:Helados[]=[];
  constructor(private firestore: AngularFirestore,
              private router: Router) { }
  
  obtenerColeccionesFb(){
    this.href = this.router.url
    return this.firestore.collection(`${this.href}`, ref => ref.where('oferta', '==', true))
    .valueChanges()
    
  }

  // obtenerOfertasFb(){
  //   return this.firestore.collection('baldes', ref => ref.where('oferta','==', true))
  //   .valueChanges()
  // }


}

