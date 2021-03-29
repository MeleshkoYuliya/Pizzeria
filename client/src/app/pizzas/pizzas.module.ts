import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PizzasComponent } from './pizzas.component';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { PizzaDashboardComponent } from './pizza-dashboard/pizza-dashboard.component';

import { PizzasRoutingModule } from './pizzas-routing.module';
import { OrderCardComponent } from '../order/order-card/order-card.component';
import { ModalDirective } from '../pizzas/pizza-item/modal.directive';
import { ChangeIngredientComponent } from './change-ingredient/change-ingredient.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PizzasRoutingModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    PizzasComponent,
    PizzaItemComponent,
    PizzaDetailComponent,
    PizzaDashboardComponent,
    OrderCardComponent,
    ModalDirective,
    ChangeIngredientComponent
  ],
  exports: [
    PizzasComponent,
  ]
})
export class PizzasModule { }
