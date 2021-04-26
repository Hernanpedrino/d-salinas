import { Component, OnInit } from '@angular/core';
import { HeladosService } from '../../services/helados.service';
import { Helados } from 'src/app/models/helados.model';
import Swal from 'sweetalert2';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public items: Helados[] = [];
  public tipoDeProd: string;
  public cargando = true;
  constructor(private heladosservice: HeladosService,
              private router: Router) { 
      this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: any) => event.snapshot.data)
      )
      .subscribe(data => {
        this.tipoDeProd = data.producto;
      });
  }

  ngOnInit(): void {
    this.heladosservice.obtenerColeccionesFb().subscribe(resp => {
      this.items = resp;
      this.cargando = false;
    });
  }
  agregarAlCarrito(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
