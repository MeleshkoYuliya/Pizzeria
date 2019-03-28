import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PizzasComponent } from './pizzas.component';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { PizzaDashboardComponent } from './pizza-dashboard/pizza-dashboard.component';

import { PizzasRoutingModule } from './pizzas-routing.modules';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PizzasRoutingModule
  ],
  declarations: [
    PizzasComponent,
    PizzaItemComponent,
    PizzaDetailComponent,
    PizzaDashboardComponent
  ],
  exports: [
    PizzasComponent,
  ]
})
export class PizzasModule { }
