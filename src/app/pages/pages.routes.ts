import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetallesComponent } from './detalles/detalles.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
    { path: 'baldes', component: ProductosComponent, data: {producto: 'baldes'} },
    { path: 'golosinas-heladas', component: ProductosComponent, data: {producto: 'golosinas-heladas'}  },
    { path: 'postres-helados', component: ProductosComponent, data: {producto: 'postres-helados'} },
    { path: 'congelados', component: ProductosComponent, data: {producto: 'congelados'} },
    { path: 'productos-sin-tacc', component: ProductosComponent, data: {producto: 'productos-sin-tacc'} },
    { path: 'carrito', component: CarritoComponent },
    { path: 'confirmar-pedido', component: ContactoComponent },
    { path: 'detalles/baldes/:id', component: DetallesComponent, data: {producto: 'baldes'} },
    { path: 'detalles/postres-helados/:id', component: DetallesComponent, data: {producto: 'postres-helados'} },
    { path: 'detalles/productos-sin-tacc/:id', component: DetallesComponent, data: {producto: 'productos-sin-tacc'} },
    { path: 'detalles/golosinas-heladas/:id', component: DetallesComponent, data: {producto: 'golosinas-heladas'} },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
