import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PizzasComponent } from './pizzas.component';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
// import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import { PizzasRoutingModule } from './pizzas-routing.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PizzasRoutingModule
  ],
  declarations: [
    PizzasComponent,
    PizzaItemComponent
  ],
  exports: [
    PizzasComponent
  ]
})
export class PizzasModule { }
