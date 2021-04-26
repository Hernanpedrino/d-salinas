import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public badge: number;
  constructor(public caritoservice: CarritoService) {
  }
  ngOnInit(): void {
    this.caritoservice.obtenerPedido().subscribe(items => {
      this.badge = items.length;
    });
  }

}
