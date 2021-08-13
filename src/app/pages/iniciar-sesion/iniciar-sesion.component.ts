import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  private nombre: string;
  inicioSesion: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private usuariosService: UsuariosService,
              private router: Router) {
    this.inicioSesion = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
  }
  iniciarSesion(){
    const email = this.inicioSesion.get('email').value;
    const password = this.inicioSesion.get('password').value;
    this.authService.logInEmailPassword(email, password).subscribe( resp => {
      const uid = Object.values(resp)[1];
      localStorage.setItem('uid', uid);
      this.usuariosService.obtenerUsuario(uid).subscribe( resp2 => {
        // tslint:disable-next-line: no-string-literal
        const nombrebd = resp2['usuario']['nombre'];
        this.nombre = nombrebd;
        localStorage.setItem('nombre', nombrebd);
      });
      Swal.fire({
        title: 'Bienvenido a Distribuidora Salinas',
        icon: 'success',
        allowOutsideClick: false
      }).then(() => {
        Swal.close();
        window.open(`${environment.urlsInternas.home}`, '_top');
        window.location.reload();
      });
    }, err => {
    // Manejo del error en la autenticacion
      switch (err.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          Swal.fire({
            title: 'Usuario no registrado',
            text: 'Por favor complete el formulario de registro',
            icon: 'error',
            allowOutsideClick: false
          }).then(() => {
            Swal.close();
            window.open(`${environment.urlsInternas.registrarse}`, '_top');
          });
          break;
        case 'INVALID_PASSWORD':
          Swal.fire({
            title: 'Constraseña invalida',
            text: 'Verifique su contraseña',
            icon: 'error',
            allowOutsideClick: false
          }).then(() => {
            Swal.close();
            window.open(`${environment.urlsInternas.iniciarSesion}`, '_top');
          });
          break;
        default:
          break;
      }
    });
    // TODO: En la respuesta recibir el nuevo token y verificar la sesion para poder continuar y verificar la validez de sesion
    localStorage.removeItem('uid');
  }
  iniciarSesionGoogle(){
    this.authService.iniciarConGoogle().subscribe();
    // TODO: Verificar que este registrado en auth ya que se puede iniciar sin estar registrado previamente
  }
}
