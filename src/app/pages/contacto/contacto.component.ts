import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  contacto: FormGroup;
  constructor(private fb: FormBuilder,
              private emailservice: EmailService) {
                this.crearFormularioContacto();
              }
          
  ngOnInit(): void {
  }
  crearFormularioContacto(){
    this.contacto = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      pedido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

  }
  sendEmail(){
    // const templateParams = this.contacto.value
    // this.emailservice.sendEmail(templateParams);
    this.contacto.reset();
    console.log(this.contacto.value);
    
  }
}
