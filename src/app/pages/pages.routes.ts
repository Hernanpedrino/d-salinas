import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetallesComponent } from './detalles/detalles.component';

const routes: Routes = [ 
    { path: 'baldes', component: ProductosComponent },
    { path: 'golosinas-heladas', component: ProductosComponent },
    { path: 'postres-helados', component: ProductosComponent },
    { path: 'combos', component: ProductosComponent },
    { path: 'productos-sin-tacc', component: ProductosComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'detalles/:id', component: DetallesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
