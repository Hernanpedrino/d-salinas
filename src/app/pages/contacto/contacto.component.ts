import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { CarritoService } from '../../services/carrito.service';
import { Pedidos } from 'src/app/models/pedidos.models'

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
              private emailservice: EmailService,
              private carritoservice: CarritoService) {
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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
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
  sendEmail(){
    const templateParams = {
      nombre: this.contacto.get('nombre').value,
      apellido: this.contacto.get('apellido').value,
      telefono: this.contacto.get('telefono').value,
      direccion: this.contacto.get('direccion').value,
      email: this.contacto.get('email').value,
      pedido: this.itemsFb
    };
    this.emailservice.sendEmail(templateParams);
    // this.carritoservice.borrarPedido();
    localStorage.clear();
    this.contacto.reset();
  }
}

