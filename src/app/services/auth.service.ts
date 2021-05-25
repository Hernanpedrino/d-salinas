import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Usuarios } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = environment.firebase.apiKey;
  userToken: string;
  // Para crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Para iniciar sesion con correo y contraseña
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.obtenerTokenLs();
   }
  nuevoUsuario(usuario: Usuarios){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        // tslint:disable-next-line: no-string-literal
        this.guardarToken(resp[ 'idToken' ]);
        return resp;
      })
    );
  }
  login(usuario: Usuarios){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        // tslint:disable-next-line: no-string-literal
        this.guardarToken(resp[ 'idToken' ]);
        return resp;
      })
    );
  }
  private guardarToken( idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', this.userToken);
  }
  obtenerTokenLs(){
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    }
    return this.userToken;
  }
}
