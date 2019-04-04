import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PizzasComponent } from './pizzas.component';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { PizzaDashboardComponent } from './pizza-dashboard/pizza-dashboard.component';

import { PizzasRoutingModule } from './pizzas-routing.modules';
import { OrderCardComponent } from '../order/order-card/order-card.component';


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
    PizzaDashboardComponent,
    OrderCardComponent
  ],
  exports: [
    PizzasComponent,
  ]
})
export class PizzasModule { }
