import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public usuario;
  public badge: number;
  constructor(private caritoservice: CarritoService,
              private authService: AuthService,
              private usuariosService: UsuariosService) {
  }
  ngOnInit() {
    this.caritoservice.obtenerPedido().subscribe(items => {
      this.badge = items.length;
    }),
    delay(2000);
  }
  logout(){
    this.authService.logout().subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Sesion Cerrada',
        text: 'Muchas gracias por tu visita!'
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:  `Ocurrio un error al cerrar la sesion: ${error}`
      });
    });
  }

}
