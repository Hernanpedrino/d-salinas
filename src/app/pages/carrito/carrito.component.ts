import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Pedidos } from '../../models/pedidos.models';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public subTotal = 0;
  public arregItems: Pedidos[] = [];
  public subTotales = [] as any;
  constructor(private carritoservice: CarritoService) {
  }
  ngOnInit() {
    this.carritoservice.obtenerPedido().subscribe((pedido: Pedidos[]) => {
      this.arregItems = pedido;
    });
    this.carritoservice.obtenerItemDelPedido().subscribe(
      pedidos => {
         pedidos.find((items) => {
          const sbt = items.subTotalserv;
          this.subTotales.push(sbt);
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.subTotal = this.subTotales.reduce(reducer);
        });
      }
    );
  }
  borrarItem(){
    Swal.fire({
      title: 'Borrar item del carrito',
      text: '¿Quieres quitar este item del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quitar item',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoservice.borrarItemDelPedido();
        Swal.fire(
          'Item borrado',
          'Su articulo ha sido quitado del carrito'
        );
      }
    });
  }

}
