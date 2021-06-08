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

  constructor(private carritoservice: CarritoService,
              private router: Router) {
  }
  ngOnInit() {
  }
  // borrarItem(){
  //   Swal.fire({
  //     title: 'Vaciar Carrito',
  //     text: '¿Quieres vaciar todo el carrito?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, vaciar todo',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.carritoservice.borrarPedido();
  //       Swal.fire(
  //         'Carrito vaciado',
  //       );
  //       this.router.navigate(['/home']);
  //     }
  //   });
  // }

}
