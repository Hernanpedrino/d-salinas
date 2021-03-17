import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public arregItems = [] as any;
  constructor(private carritoservice: CarritoService) { 
    this.carritoservice.itemAlCarrito$.subscribe(item=>{
      this.arregItems.push(item);
      console.log(this.arregItems, 'Item recibido correctamente');
      
    }
    )
  }

  ngOnInit() {
    
  }

}
