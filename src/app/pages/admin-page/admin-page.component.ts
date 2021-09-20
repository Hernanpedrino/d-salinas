import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Helados } from 'src/app/models/helados.model';
import { HeladosService } from 'src/app/services/helados.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  baldes: Helados[] = [];
  postres: Helados[] = [];
  golosinas: Helados[] = [];
  tacc: Helados[] = [];
  productos: Helados[] = [];
  cargando = true;
  constructor(private heladosservice: HeladosService) { }

  ngOnInit(): void {
    combineLatest([
      this.heladosservice.obtenerGolosinasFb(),
      this.heladosservice.obtenerPostresFb(),
      this.heladosservice.obtenerBaldesFb(),
      this.heladosservice.obtenerSintaccFb()
    ])
    .subscribe(([baldes, postres, golosinas, tacc]) => {
      this.baldes = baldes,
      this.postres = postres,
      this.golosinas = golosinas,
      this.tacc = tacc;
      const productos = this.baldes.concat(this.golosinas, this.postres, this.tacc);
      this.productos = productos;
      this.cargando = false;
    }, (error) => {
      console.log(error);
    });
  }
}
