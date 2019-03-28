import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { PizzasComponent } from './pizzas.component';

const pizzasRoutes: Routes = [
  { path: 'pizzas', component: PizzasComponent, data: { animation: 'pizzas' } },
  { path: 'pizza/:id', component: PizzaDetailComponent, data: { animation: 'pizza' } }
];

@NgModule({
  imports: [
    RouterModule.forChild(pizzasRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PizzasRoutingModule { }
