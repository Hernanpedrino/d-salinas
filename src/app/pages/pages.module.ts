import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// Modulos personalizados
import { SharedModule } from '../shared/shared.module';
// Componentes
import { CarritoComponent } from './carrito/carrito.component';
import { HomeComponent } from './home/home.component';
import { DetallesComponent } from './detalles/detalles.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EditarComponent } from './admin-page/editar/editar.component';
import { AgregarComponent } from './admin-page/agregar/agregar.component';



@NgModule({
  declarations: [
    CarritoComponent,
    HomeComponent,
    DetallesComponent,
    OfertasComponent,
    ProductosComponent,
    ContactoComponent,
    IniciarSesionComponent,
    PerfilComponent,
    AdminPageComponent,
    EditarComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
