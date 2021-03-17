import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  itemAlCarrito$ = new EventEmitter<object>();
  constructor() { }
}
