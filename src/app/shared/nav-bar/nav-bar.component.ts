import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public nombre: string;
  public cantidadCarrito = [];
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.obtenerNombre();
    this.pedidoEnCarrito();
  }
  logOut(){
    this.authService.logOut();
    this.nombre = '';
  }
  obtenerNombre(){
    const nombreLs = localStorage.getItem('nombre');
    if (nombreLs) {
      this.nombre = nombreLs;
    }
  }
  pedidoEnCarrito(){
    if (localStorage.getItem('pedido')) {
      this.cantidadCarrito = JSON.parse(localStorage.getItem('pedido'));
    }
  }
}
