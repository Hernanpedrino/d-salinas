import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public pedidoEnLs = [];
  public total = 0;
  constructor() {
  }
  ngOnInit() {
    this.pedidoEnLs = JSON.parse(localStorage.getItem('pedido'));
    this.totalPedido();
  }

  totalPedido(){
    let subTotal = 0;
    if (this.pedidoEnLs !== null) {
      this.pedidoEnLs.forEach(pedido => {
        subTotal += pedido.cantidad * pedido.precio;
      });
    }
    this.total = subTotal;
  }
  borrarItem(index){
    this.pedidoEnLs = JSON.parse(localStorage.getItem('pedido'));
    Swal.fire({
      title: 'Quitar Articulo',
      text: '¿Quieres quitar este articulo de tu carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoEnLs.splice(index, 1);
        localStorage.setItem('pedido', JSON.stringify(this.pedidoEnLs));
        Swal.fire(
          'Articulo eliminado',
        );
        window.location.reload();
      } else {
        return;
      }
    });
  }
  vaciarCarrito(){
    Swal.fire({
      title: 'Vaciar Carrito',
      text: '¿Quieres vaciar tu carrito de compras?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('pedido');
        Swal.fire(
          'Carrito vaciado correctamente',
        );
        window.location.reload();
      } else {
        return;
      }
    });
  }

}
