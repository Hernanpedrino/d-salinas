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

  public totalPedido = 0;
  public arregItems: Pedidos[] = [];
  subTotales = [] as any;
  constructor(private carritoservice: CarritoService) {
  }
  ngOnInit() {
    this.carritoservice.obtenerPedido().subscribe((pedido: Pedidos[]) => {
      this.arregItems = pedido;
    });
    this.carritoservice.obtenerItemDelPedido().subscribe(pedido => {
      pedido.map(data => {
        // const precio = data.data.precio;
        // const cantidad = data.data.cantidad;
        // const multiplic = precio * cantidad;
        // this.subTotales.push(multiplic);
      });
      this.totalPedido = this.subTotales.reduce((a, b) => a + b, 0);
      // console.log(this.totalPedido, this.subTotales);
      // TODO: Hacer un pipe personalizado para sumar los totales.
    });
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
        Swal.fire(
          'Item borrado',
          'Su articulo ha sido quitado del carrito'
        );
      }
    });
  }
}
