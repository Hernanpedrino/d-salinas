import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  
  constructor() { }
  almacenarItemLs(item){
    let listaProd = [];
    if (localStorage.getItem(`${localStorage.length}`) == null) {
      localStorage.setItem(`${localStorage.length}`, JSON.stringify(item));
    } else {
      let nuevaLista = listaProd.push(item);
      let numero = localStorage.length;
      let nuevoNum = numero + 1
      let nuevaKey = 'ItemComprado'+nuevoNum;
      localStorage.setItem(`${nuevaKey}`, JSON.stringify(nuevaLista))       
      console.log(nuevaLista);
    }
  }
}
