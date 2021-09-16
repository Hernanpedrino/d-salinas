import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetallesComponent } from './detalles/detalles.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
// Guards 
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    { path: 'baldes', component: ProductosComponent, data: {producto: 'baldes'} },
    { path: 'golosinas-heladas', component: ProductosComponent, data: {producto: 'golosinas-heladas'}  },
    { path: 'postres-helados', component: ProductosComponent, data: {producto: 'postres-helados'} },
    { path: 'congelados', component: ProductosComponent, data: {producto: 'congelados'} },
    { path: 'productos-sin-tacc', component: ProductosComponent, data: {producto: 'productos-sin-tacc'} },
    { path: 'carrito', component: CarritoComponent, canActivate: [ AuthGuard ]},
    { path: 'registrarse', component: ContactoComponent },
    { path: 'iniciar-sesion', component: IniciarSesionComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [ AuthGuard ] },
    { path: 'detalles/baldes/:id', component: DetallesComponent, data: {producto: 'baldes'} },
    { path: 'detalles/postres-helados/:id', component: DetallesComponent, data: {producto: 'postres-helados'} },
    { path: 'detalles/productos-sin-tacc/:id', component: DetallesComponent, data: {producto: 'productos-sin-tacc'} },
    { path: 'detalles/golosinas-heladas/:id', component: DetallesComponent, data: {producto: 'golosinas-heladas'} },
    { path: 'admin', component: AdminPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
