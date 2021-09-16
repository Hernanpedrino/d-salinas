import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
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
  itemsArreg = [];
  url: string;
  public cargando = true;
  constructor(private heladosservice: HeladosService,
              private activroute: ActivatedRoute,
              private fb: FormBuilder) {  }

  ngOnInit(): void {
    const id = this.activroute.snapshot.paramMap.get('id');
    const tipo = this.activroute.snapshot.data;
    this.url = `detalles/${tipo.producto}/${id}`;
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
  agregarAlCarrito(){
    if (this.formdet.controls.sabor.value === 'Seleccione un sabor' || this.formdet.controls.cantidad.value === 'Cantidad a comprar'){
      Swal.fire({
        icon: 'warning',
        title: 'Por favor seleccione un sabor y la cantidad a comprar',
      });
    }else{
      const datos = {
        nombre: this.formdet.get('nombre').value,
        cantidad: this.formdet.get('cantidad').value,
        descripcion: this.formdet.get('descripcion').value,
        precio: this.formdet.get('precio').value,
        sabor: this.formdet.get('sabor').value,
        url: this.url
      };
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 2000
      });
      const pedidoEnLs = localStorage.getItem('pedido');
      let count = 0;
      let index;
      if (!pedidoEnLs) {
        this.itemsArreg.push(datos);
        localStorage.setItem('pedido', JSON.stringify(this.itemsArreg));
        count ++;
        window.open(`${environment.urlsInternas.carrito}`, '_top');
        window.location.reload();
      } else {
        this.itemsArreg = JSON.parse(localStorage.getItem('pedido'));
        for (const i in this.itemsArreg) {
          if (datos.nombre === this.itemsArreg[i].nombre && datos.sabor === this.itemsArreg[i].sabor) {
            count --;
            index = i;
          }
        }
        if (count === -1) {
            Swal.fire({
              title: 'El producto ya se encuentra en tu carrito',
              text: '¿Quieres agregar la cantidad seleccionada?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, agregar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.itemsArreg[index].cantidad += datos.cantidad;
                localStorage.setItem('pedido', JSON.stringify(this.itemsArreg));
                Swal.fire(
                  'Cantidad agregada al pedido.'
                );
                window.open(`${environment.urlsInternas.carrito}`, '_top');
                window.location.reload();
              } else {
                return;
              }
            });
        } else {
          this.itemsArreg = JSON.parse(localStorage.getItem('pedido'));
          this.itemsArreg.push(datos);
          localStorage.setItem('pedido', JSON.stringify(this.itemsArreg));
          window.open(`${environment.urlsInternas.carrito}`, '_top');
          window.location.reload();
        }
      }
      count = 0;
    }
  }
}
