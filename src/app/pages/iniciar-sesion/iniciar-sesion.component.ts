import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

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
  iniciarSesion(){
    const email = this.inicioSesion.get('email').value;
    const password = this.inicioSesion.get('password').value;
    this.authService.logInEmailPassword(email, password).subscribe( resp => {
      console.log(resp);
      const uid = Object.values(resp)[1];
      localStorage.setItem('uid', uid);
    }, err => {
    // Manejo del error en la autenticacion
      console.log(err);
      if (err.error.error.message === 'EMAIL_NOT_FOUND') {
        Swal.fire({
          title: 'Usuario no registrado',
          text: 'Por favor complete el formulario de registro',
          icon: 'error',
          allowOutsideClick: false
        }).then(() => {
          Swal.close();
          window.open(`${environment.urlsInternas.registrarse}`, '_top');
        });
      }
    });
    // TODO: En la respuesta recibir el nuevo token y verificar la sesion para poder continuar
    window.open(`${environment.urlsInternas.home}`, '_top');
    localStorage.removeItem('uid');
  }
  iniciarSesionGoogle(){
    this.authService.iniciarConGoogle().subscribe();
  }
}
