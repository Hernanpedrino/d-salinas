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



@NgModule({
  declarations: [
    CarritoComponent,
    HomeComponent,
    DetallesComponent,
    OfertasComponent,
    ProductosComponent, ContactoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
