import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzasComponent } from './components/pizzas/pizzas.component';
import { CheckoutComponent } from './components/order/checkout/checkout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PizzaDetailComponent } from './components/pizzas/pizza-detail/pizza-detail.component';

const routes: Routes = [
  { path: 'pizzas', component: PizzasComponent },
  { path: 'pizzas/:id', component: PizzaDetailComponent },
  { path: 'pizzas/**', redirectTo: '/not-found' },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
