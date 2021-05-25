import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private carritoservice: CarritoService,
              private router: Router) {
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
      title: 'Vaciar Carrito',
      text: '¿Quieres vaciar todo el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, vaciar todo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoservice.borrarPedido();
        Swal.fire(
          'Carrito vaciado',
        );
        this.router.navigate(['/home']);
      }
    });
  }

}
