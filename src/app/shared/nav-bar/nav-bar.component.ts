import { Component, OnInit } from '@angular/core';
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

  constructor(private caritoservice: CarritoService,
              private authService: AuthService,
              private usuariosService: UsuariosService) {
  }
  ngOnInit() {
    const uid = localStorage.getItem('uid');
    this.usuariosService.obtenerUsuario(uid).subscribe( resp => {
      const usuario = Object.values(resp)[1];
      const nombre = usuario.nombre;
    });
  }
  logOut(){
    this.authService.logOut();
  }
}
