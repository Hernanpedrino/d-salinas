import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  inicioSesion: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.inicioSesion = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  login(){
    if (this.inicioSesion.pristine || this.inicioSesion.untouched || this.inicioSesion.invalid){
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Por favor complete su correo y contraseña'
      }
      );
      return;
    }
    Swal.fire({
      icon: 'info',
      title: 'Iniciando Sesion',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    const email = this.inicioSesion.get('email').value;
    const password = this.inicioSesion.get('password').value;
    this.authService.inicioSesionConEmailPassword(email, password).subscribe(
      resp => {
        Swal.close();
        this.router.navigateByUrl('/home');
      }, err => {
        if (err.error.error.message === 'EMAIL_NOT_FOUND') {
          Swal.fire({
            icon: 'question',
            title: 'El correo no esta registrado',
            text: 'Por favor cree una cuenta'
          });
          this.router.navigateByUrl('/registrarse');
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Email o contraseña incorrecto'
          });
        }
      }
    );
  }

}
