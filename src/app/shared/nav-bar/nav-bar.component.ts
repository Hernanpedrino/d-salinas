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

  private uid = '';
  public badge: number;
  public nombre = '';
  public apellido = '';
  public usuario = false;
  constructor(private caritoservice: CarritoService,
              private authService: AuthService,
              private usuariosService: UsuariosService) {
  }
  ngOnInit() {
    // this.caritoservice.obtenerPedido().subscribe(items => {
    //   this.badge = items.length;
    // }), delay(3000);
    this.usuariosService.obtenerUsuarioBd()
    .subscribe(resp => {
      this.nombre = resp.nombre;
      this.apellido = resp.apellido;
      this.usuario = true;
    });
  }
  logout(){
    this.authService.logout().subscribe(), delay(3000);
    this.usuario = false;
  }
}
