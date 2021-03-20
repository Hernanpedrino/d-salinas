import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Pedidos } from '../../models/pedidos.models';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public subTotal = 0;
  public arregItems: Pedidos[] = [];
  subTotales = [] as any;
  constructor(private carritoservice: CarritoService) {
  }
  ngOnInit() {
    this.carritoservice.obtenerPedido().subscribe((pedido: Pedidos[]) => {
      this.arregItems = pedido;
    });
  }

}
