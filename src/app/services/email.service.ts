import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { init } from 'emailjs-com';
init(`${environment.emailJs.userId}`);
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor() { }

sendEmail(templateParams) {
    emailjs.send(`${environment.emailJs.serviceId}`, `${environment.emailJs.templateId}`, templateParams, `${environment.emailJs.userId}` );
}

}
