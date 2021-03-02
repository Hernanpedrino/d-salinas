import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Helados } from 'src/app/models/helados.model';
import { HeladosService } from 'src/app/services/helados.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

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
        console.log(resp.data(), 'Respuesta del documento de fb con id');
        this.idbaldes = resp.data()
        console.log(this.idbaldes, 'Respuesta con los datos cargados');
        
      }
    )
  }

}
