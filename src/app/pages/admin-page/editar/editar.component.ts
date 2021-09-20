import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeladosService } from 'src/app/services/helados.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  nuevoSabor = false;
  formEditar: FormGroup;
  constructor(private fb: FormBuilder,
              private activroute: ActivatedRoute,
              private heladosservice: HeladosService) {
              }
  ngOnInit(): void {
    this.crearFormEdicion();
  }
  agregarSabor(){
    this.nuevoSabor = !this.nuevoSabor;
  }
  crearFormEdicion(){
    const id = this.activroute.snapshot.paramMap.get('id');
    const tipoProd = this.activroute.snapshot.paramMap.get('tipoProd');
    let nombre;
    this.heladosservice
    .obtenerDocumentoId(`${id}`, `${tipoProd}`)
    .subscribe(resp => {
      nombre = resp.data().titulo;
      console.log(nombre);
    });
    this.formEditar = this.fb.group({
      nombre: `Conobola`,
      descripcion: 'Detalles de los helados',
      precio: '156311',
      sabor: 'Chocolate',
      imagen: ''
    });
  }
}
