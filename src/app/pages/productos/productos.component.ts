import { Component, OnInit } from '@angular/core';
import { HeladosService } from '../../services/helados.service';
import { Helados } from 'src/app/models/helados.model';


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
      console.log(resp)
    })
  }
  // agregarAlCarrito(){
  //   Swal.fire({
  //     position: 'top-end',
  //     icon: 'success',
  //     title: 'Your work has been saved',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }
}
