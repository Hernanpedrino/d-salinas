import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    NavBarComponent,
    CarouselComponent,
    FooterComponent,
    ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    CarouselComponent,
    FooterComponent
  ]
})
export class SharedModule { }
