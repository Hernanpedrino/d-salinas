import { Component, OnInit } from '@angular/core';
import { Helados } from 'src/app/models/helados.model';
import { HeladosService } from 'src/app/services/helados.service';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  ofertasbaldes:Helados[]=[];
  ofertaspostres:Helados[]=[];
  ofertasgolosinas:Helados[]=[];
  ofertastacc:Helados[]=[];
  constructor(private heladosservice: HeladosService) { }

  ngOnInit(): void {
    this.heladosservice.obtenerOfertasBaldesFb().subscribe(resp=>{
      this.ofertasbaldes = resp
    });
    this.heladosservice.obtenerOfertasPostresFb().subscribe(resp=>{
      this.ofertaspostres = resp
    });
    this.heladosservice.obtenerOfertasGolosinasFb().subscribe(resp=>{
      this.ofertasgolosinas = resp
    });
    this.heladosservice.obtenerOfertastaccFb().subscribe(resp=>{
      this.ofertasgolosinas = resp
    });
    
  }

}
