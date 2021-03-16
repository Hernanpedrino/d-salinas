import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  itemAlCarrito$ = new Subject<any>()
  constructor() { }
}
