import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { CarritoService } from '../../services/carrito.service';
import { Pedidos } from 'src/app/models/pedidos.models';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public arregItems: Pedidos[] = [];
  contacto: FormGroup;
  constructor(private fb: FormBuilder,
              private emailservice: EmailService,
              private carritoservice: CarritoService) {
              this.crearFormularioContacto();
            }
          
  ngOnInit(): void {

  }
  crearFormularioContacto(){
    this.contacto = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      pedido: '',
      email: ['', [Validators.required, Validators.email]],
    });

  }
  sendEmail(){
    // const templateParams = this.contacto.value;
    // this.emailservice.sendEmail(templateParams);
    console.log(this.contacto.value);
    this.carritoservice.borrarPedido();
    localStorage.clear();
    this.contacto.reset();
  }
}
// TODO: desabilitar el boton con el formulario no valido