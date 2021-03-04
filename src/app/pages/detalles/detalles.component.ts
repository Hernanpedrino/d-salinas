import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeladosService } from 'src/app/services/helados.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Output() itemAlCarrito:EventEmitter<{}>
  public idbaldes:any={};
  constructor(private heladosservice: HeladosService,
              private activroute: ActivatedRoute,
              private router: Router) {  }

  ngOnInit(): void {
    const id = this.activroute.snapshot.paramMap.get('id');
    const href = this.router.url;
    console.log(id,href);
    this.heladosservice.obtenerDocumentoId(`${id}`).subscribe(
      resp=>{
        this.idbaldes = resp.data()
      }
    )
  }
  agregarAlCarrito(){
    this.itemAlCarrito.emit(this.idbaldes);
    console.log(this.idbaldes);
  }
  
}
