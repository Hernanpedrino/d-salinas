import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public arregItems = [] as any;
  constructor() { 
    
  }
  ngOnInit() {
    if (localStorage.length == 0) {
      return
    } else {
      let number = localStorage.length;
      let item = JSON.parse(localStorage.getItem(`${number}`));
      this.arregItems.push(item);
      console.log(this.arregItems);
      console.log(item);
    }
    console.log(localStorage.length);
    
  }
  

}
