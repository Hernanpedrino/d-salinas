import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeladosService } from 'src/app/services/helados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  idbaldes:any={};
  public cargando:boolean = true;
  constructor(private heladosservice: HeladosService,
              private activroute: ActivatedRoute) {  }

  ngOnInit(): void {
    const id = this.activroute.snapshot.paramMap.get('id');
    this.heladosservice.obtenerDocumentoId(`${id}`).subscribe(
      resp =>{
        this.idbaldes = resp.data()
        this.cargando = false;
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
