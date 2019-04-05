import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PizzasComponent } from './pizzas.component';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { PizzaDashboardComponent } from './pizza-dashboard/pizza-dashboard.component';

import { PizzasRoutingModule } from './pizzas-routing.modules';
import { OrderCardComponent } from '../order/order-card/order-card.component';
import { HelloComponent } from './hello/hello.component';
import { ModalModule } from '../pizzas/modal/modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PizzasRoutingModule,
    ModalModule
  ],
  declarations: [
    PizzasComponent,
    PizzaItemComponent,
    PizzaDetailComponent,
    PizzaDashboardComponent,
    OrderCardComponent,
    HelloComponent
  ],
  exports: [
    PizzasComponent,
  ],
  entryComponents: [HelloComponent],
})
export class PizzasModule { }
