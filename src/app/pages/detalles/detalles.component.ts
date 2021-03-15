import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeladosService } from 'src/app/services/helados.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  formdet: FormGroup;
  idbaldes:any={};
  saboresArreg:any[];
  public cargando:boolean = true;
  constructor(private heladosservice: HeladosService,
              private activroute: ActivatedRoute,
              private fb: FormBuilder) {  }

  ngOnInit(): void {
    const id = this.activroute.snapshot.paramMap.get('id');
    this.heladosservice.obtenerDocumentoId(`${id}`).subscribe(
      resp =>{
        this.idbaldes = resp.data();
        this.saboresArreg = resp.data().sabores;
        console.log(resp.data(), this.saboresArreg);
        this.formdet = this.fb.group({
          nombre: [{value: `${this.idbaldes.titulo}`, disabled:true}],
          descripcion: [{value:`${this.idbaldes.descripcion}`, disabled:true}],
          precio: [{value: `$ ${this.idbaldes.precio}`, disabled:true}],
          sabor: ['Seleccione un sabor', Validators.required],
          cantidad: ['Cantidad a comprar', Validators.required]
        });
        this.cargando = false;
    }
    );
    
  }
  agregarAlCarrito(formdet){
    if(this.formdet.controls.sabor.value === 'Seleccione un sabor' || this.formdet.controls.cantidad.value === 'Cantidad a comprar'){
      Swal.fire({
        icon: 'warning',
        title: 'Por favor seleccione un sabor y la cantidad a comprar',
      })
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 2000
      }),
      console.log(formdet);
      console.log(formdet.controls.nombre.value);
    }
  }
  
}
