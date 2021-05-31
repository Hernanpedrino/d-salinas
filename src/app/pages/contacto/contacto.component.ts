import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { EmailService } from '../../services/email.service';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
import { CarritoService } from '../../services/carrito.service';
import { Pedidos } from 'src/app/models/pedidos.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public arregItems: Pedidos[] = [];
  private itemsFb;
  contacto: FormGroup;
  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private usuarioservice: UsuariosService,
              private carritoservice: CarritoService,
              private router: Router) {
              this.crearFormularioContacto();
            }
  ngOnInit(): void {
    this.carritoservice.obtenerPedido().
    subscribe((pedido: Pedidos[]) => {
      this.arregItems = pedido;
      for (const items of this.arregItems) {
        const ped = Object.entries(items);
        this.itemsFb = ped;
      }
    });
  }
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
  crearUsuario(){
    const datos = {
      ...this.contacto.value
    };
    this.authservice.nuevoUsuario(datos).subscribe(
      resp => {
        Swal.fire({
          icon: 'info',
          title: 'Registrando usuario',
          text: 'Espere por favor'
        });
        Swal.showLoading();
        this.router.navigateByUrl('/home');
        Swal.close();
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.error.message
        });
      }
    );
    this.usuarioservice.crearUsuario(datos);
  }
  // sendEmail(){
  //   const templateParams = {
  //     nombre: this.contacto.get('nombre').value,
  //     apellido: this.contacto.get('apellido').value,
  //     telefono: this.contacto.get('telefono').value,
  //     direccion: this.contacto.get('direccion').value,
  //     email: this.contacto.get('email').value,
  //     pedido: this.itemsFb
  //   };
  //   // this.emailservice.sendEmail(templateParams);
  //   this.carritoservice.borrarPedido();
  //   localStorage.clear();
  //   this.contacto.reset();
  // }
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

