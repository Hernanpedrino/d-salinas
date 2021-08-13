import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  uid: string;
  idToken: string;
  contacto: FormGroup;
  google: FormGroup;
  googleForm = false;
  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private usuarioservice: UsuariosService) {
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
  submitFormGoogle(){
    const direccion = this.google.get('direccion').value;
    const telefono = this.google.get('telefono').value;
    this.authservice
    .registrarConGoogle(direccion, telefono)
    .subscribe();
  }
  crearUsuarioConGoogle(){
    this.googleForm = true;
  }
  // Logueo con email y password
  // TODO: Verificar que no se encuentre registrado el mail en bd antes de grabar
  submitFormEyP(){
    const email = this.contacto.get('email').value;
    const password = this.contacto.get('password').value;
    const user = {
      nombre: `${this.contacto.get('nombre').value} ${this.contacto.get('apellido').value}`,
      email: this.contacto.get('email').value,
      google: false,
      direccion: this.contacto.get('direccion').value,
      telefono: this.contacto.get('telefono').value
    };
    this.authservice
    .registroEmailPassword(email, password)
    .subscribe(resp => {
      this.uid = Object.values(resp)[5];
      this.idToken = Object.values(resp)[1];
    });
    Swal.fire({
      title: 'Registrado',
      text: 'Usuario registrado correctamente',
      icon: 'success',
      allowOutsideClick: false
    }).then(() => {
      Swal.close();
      window.open(`${environment.urlsInternas.iniciarSesion}`, '_top');
      this.usuarioservice.guardarUsuario(this.idToken, user, this.uid).subscribe();
    });
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
  get direccionInvalidoGoogle(){
    return this.google.get('direccion').invalid && this.google.get('direccion').touched;
  }
  get direccionValido(){
    return this.contacto.get('direccion').valid;
  }
  get direccionValidoGoogle(){
    return this.google.get('direccion').valid;
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
  get telefonoInvalidoGoogle(){
    return this.google.get('telefono').invalid && this.google.get('telefono').touched;
  }
  get telefonoValido(){
    return this.contacto.get('telefono').valid;
  }
  get telefonoValidoGoogle(){
    return this.google.get('telefono').valid;
  }
  get passwordInvalido(){
    return this.contacto.get('password').invalid && this.contacto.get('password').touched;
  }
  get passwordValido(){
    return this.contacto.get('password').valid;
  }

}
