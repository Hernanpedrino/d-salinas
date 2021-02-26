import { Component, OnInit } from '@angular/core';
import { HeladosService } from '../../services/helados.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private heladosservice: HeladosService) { }

  ngOnInit(): void {
    this.heladosservice.obtenerColeccionesFb().subscribe(items=>console.log(items)
    )
  }

}
