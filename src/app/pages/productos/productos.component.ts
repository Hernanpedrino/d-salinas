import { Component, OnInit } from '@angular/core';
import { HeladosService } from '../../services/helados.service';
import { Helados } from 'src/app/models/helados.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  items:Helados[]=[];
  constructor(private heladosservice: HeladosService) { }

  ngOnInit(): void {
    this.heladosservice.obtenerColeccionesFb().subscribe(resp=>{
      this.items = resp
      
    })
  }
  agregarAlCarrito(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 2000
    })
  }
}
