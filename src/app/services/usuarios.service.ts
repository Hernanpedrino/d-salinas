import { Injectable } from '@angular/core';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuarios } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { }
  
}
