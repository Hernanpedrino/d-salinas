import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Helados } from 'src/app/models/helados.model';
import { HeladosService } from '../../services/helados.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  baldes: Helados[] = [];
  postres: Helados[] = [];
  golosinas: Helados[] = [];
  tacc: Helados[] = [];
  productos: Helados[] = [];
  constructor(private heladosservice: HeladosService) { }

  ngOnInit(): void {
  }
  verTodo(){
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
    });
  }
}
