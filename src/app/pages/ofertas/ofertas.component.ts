import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Helados } from 'src/app/models/helados.model';
import { HeladosService } from 'src/app/services/helados.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  cargando = true;
  ofertasbaldes: Helados[] = [];
  ofertaspostres: Helados[] = [];
  ofertasgolosinas: Helados[] = [];
  ofertastacc: Helados[] = [];
  todaslasofertas: Helados[] = [];
  constructor(private heladosservice: HeladosService) { }

  ngOnInit(): void {
    combineLatest([
      this.heladosservice.obtenerOfertasBaldesFb(),
      this.heladosservice.obtenerOfertasPostresFb(),
      this.heladosservice.obtenerOfertasGolosinasFb(),
      this.heladosservice.obtenerOfertastaccFb()
    ])
    .subscribe(([baldes, postres, golosinas, tacc]) => {
      this.ofertasbaldes = baldes,
      this.ofertaspostres = postres,
      this.ofertasgolosinas = golosinas,
      this.ofertastacc = tacc;
      const todaslasofertas = this.ofertasbaldes.concat(this.ofertasgolosinas, this.ofertaspostres, this.ofertastacc);
      this.todaslasofertas = todaslasofertas,
      this.cargando = false;
    });
  }
}
