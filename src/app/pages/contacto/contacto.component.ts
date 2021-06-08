import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  contacto: FormGroup;
  google: FormGroup;
  googleForm = false;
  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private usuarioservice: UsuariosService,
              private router: Router,
              private zone: NgZone) {
              this.crearFormularioContacto();
              this.crearFormularioGoogle();
            }
  ngOnInit(): void { }
  crearFormularioContacto(){
    this.contacto = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    });
  }
  crearFormularioGoogle(){
    this.google = this.fb.group({
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.pattern(/^\d+$/)]],
      direccion: ['', Validators.required],
    });
  }
  crearUsuario(){
    const password = this.contacto.get('password').value;
    const datos = {
      nombre: this.contacto.get('nombre').value,
      apellido: this.contacto.get('apellido').value,
      telefono: this.contacto.get('telefono').value,
      direccion: this.contacto.get('direccion').value,
      email: this.contacto.get('email').value,
      google: false
    };
    this.authservice.nuevoUsuario(datos.email, password).subscribe(
      resp => {
        Swal.fire({
          icon: 'info',
          title: 'Registrando usuario',
          text: 'Espere por favor'
        });
        Swal.showLoading();
        const uid = resp.user.uid;
        this.usuarioservice.agregarUsuario(datos, uid);
        this.router.navigateByUrl('/login');
        Swal.close();
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.error.message
        });
      }
    );
  }
  submitFormGoogle(){
    this.authservice.inicioSesionGoogle().subscribe(resp => {
      const uid = resp.user.uid;
      const datos = {
        nombre: resp.user.displayName.split(' ')[0],
        apellido: resp.user.displayName.split(' ')[1],
        telefono: this.google.get('telefono').value,
        direccion: this.google.get('direccion').value,
        email: resp.user.email,
        google: true
      };
      console.log(datos, uid);
      this.usuarioservice.agregarUsuario(datos, uid);
      this.zone.run(() => {
        this.router.navigateByUrl('/home');
      });
    });

  }
  crearUsuarioConGoogle(){
    this.googleForm = true;
  }
  // Getters de validaciones
  get nombreInvalido(){
    return this.contacto.get('nombre').invalid && this.contacto.get('nombre').touched;
  }
  get nombreValido(){
    return this.contacto.get('nombre').valid;
  }
  get apellidoInvalido(){
    return this.contacto.get('apellido').invalid && this.contacto.get('apellido').touched;
  }
  get apellidoValido(){
    return this.contacto.get('apellido').valid;
  }
  get direccionInvalido(){
    return this.contacto.get('direccion').invalid && this.contacto.get('direccion').touched;
  }
  get direccionValido(){
    return this.contacto.get('direccion').valid;
  }
  get emailInvalido(){
    return this.contacto.get('email').invalid && this.contacto.get('email').touched;
  }
  get emailValido(){
    return this.contacto.get('email').valid;
  }
  get telefonoInvalido(){
    return this.contacto.get('telefono').invalid && this.contacto.get('telefono').touched;
  }
  get telefonoValido(){
    return this.contacto.get('telefono').valid;
  }
  get passwordInvalido(){
    return this.contacto.get('password').invalid && this.contacto.get('password').touched;
  }
  get passwordValido(){
    return this.contacto.get('password').valid;
  }

}
