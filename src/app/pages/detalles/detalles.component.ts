import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { HeladosService } from 'src/app/services/helados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  formdet: FormGroup;
  idbaldes: any = {};
  precio: number;
  saboresArreg: any[];
  public cargando = true;
  constructor(private heladosservice: HeladosService,
              private activroute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private carritoservice: CarritoService) {  }

  ngOnInit(): void {
    const id = this.activroute.snapshot.paramMap.get('id');
    this.heladosservice.obtenerDocumentoId(`${id}`).subscribe(
      resp => {
        this.idbaldes = resp.data();
        this.precio = resp.data().precio;
        this.saboresArreg = resp.data().sabores;
        this.formdet = this.fb.group({
          nombre: [`${this.idbaldes.titulo}`],
          descripcion: [`${this.idbaldes.descripcion}`],
          precio: [parseInt(`${this.precio}`)],
          sabor: ['Seleccione un sabor', Validators.required],
          cantidad: ['Cantidad a comprar', Validators.required]
        });
        this.cargando = false;
    });
  }
  agregarAlCarrito(formdet){
    if (this.formdet.controls.sabor.value === 'Seleccione un sabor' || this.formdet.controls.cantidad.value === 'Cantidad a comprar'){
      Swal.fire({
        icon: 'warning',
        title: 'Por favor seleccione un sabor y la cantidad a comprar',
      });
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 2000
      }),
      this.carritoservice.agregarItemPedido(formdet.value);
      this.router.navigate(['/carrito']);
    }
  }
}
