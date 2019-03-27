import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PizzaDetailComponent } from './pizza-detail/pizza-detail-component';

const pizzasRoutes: Routes = [
  // { path: 'pizza/:id', redirectTo: '/pizza/:id' },
  // { path: 'pizza/:id', component: PizzaDetailComponent }
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
