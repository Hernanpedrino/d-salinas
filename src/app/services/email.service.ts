import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { init } from 'emailjs-com';
init(`${environment.emailJs.userId}`);
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  constructor() { }
 
sendEmail(templateParams) {
    emailjs.send(`${environment.emailJs.serviceId}`,`${environment.emailJs.templateId}`, templateParams,`${environment.emailJs.userId}`,)
      .then((result: EmailJSResponseStatus) => {
        Swal.fire({
          icon: 'success',
          title: 'Muchas gracias por tu compra!!!',
          text: 'Tu pedido fue enviado con exito. Nos pondremos en contacto a la brevedad.',
        })
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'Sucedio un error. Por favor intente nuevamente.',
        })
        console.log(error.text);
      });
  }

}
