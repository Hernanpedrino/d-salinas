import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { EmailService } from '../../services/email.service';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public pedidoEnLs = [];
  public total = 0;
  public url = this.pedidoEnLs['url'];
  constructor(private emailService: EmailService,
              private carritoService: CarritoService,
              private router: Router) {
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
  editarItem(i){
    const url = this.pedidoEnLs[i]['url'];
    this.pedidoEnLs.splice(i, 1);
    localStorage.setItem('pedido', JSON.stringify(this.pedidoEnLs));
    this.router.navigateByUrl(`${url}`);
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
  enviarCorreo(){
    const listaPedido = JSON.parse(localStorage.getItem('pedido'));
    const datosLs = JSON.parse(localStorage.getItem('usuario'));
    const uid = localStorage.getItem('uid');
    const datosUsuario = Object.values(datosLs);
    let detPedido = '';
    let templateParams = {};
    listaPedido.forEach(element => {
      detPedido +=
      `
      <li>Helado: ${element.nombre} - Sabor: ${element.sabor} - Cantidad: ${element.cantidad} - Precio: ${element.precio} <strong>Total: $${element.cantidad * element.precio}</strong></li>
      `;
    });
    datosUsuario.forEach( datos => {
      templateParams = {
          // tslint:disable-next-line: no-string-literal
          nombre: datos['nombre'],
          // tslint:disable-next-line: no-string-literal
          telefono: datos['telefono'],
          // tslint:disable-next-line: no-string-literal
          direccion: datos['direccion'],
          // tslint:disable-next-line: no-string-literal
          email: datos['email'],
          detalles: `
          ${detPedido}
          Total del pedido: <strong>$${this.total}</strong>
        `
        };
    });
    Swal.fire({
      title: '¿Confirmar Pedido?',
      html: `${detPedido} <br> El total de tu pedido es de: <strong>$${this.total}</strong>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        listaPedido.forEach(items => {
          delete items.url;
          items.fecha = new Date();
          this.carritoService.grabarPedido(uid, {...items}).subscribe();
        });
        this.emailService.sendEmail(templateParams);
        Swal.fire({
          title: 'Pedido enviado',
          text: 'Muchas gracias por tu compra. Nos contactaremos a la brevedad.',
          icon: 'success',
          allowOutsideClick: false
        });
        setTimeout(() => {
          window.open(`${environment.urlsInternas.home}`, '_top');
          window.location.reload();
          localStorage.removeItem('pedido');
        }, 3000);
      } else {
        return;
      }
    });
  }

}

