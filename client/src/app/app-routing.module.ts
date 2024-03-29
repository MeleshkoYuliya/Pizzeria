import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzasComponent } from './pizzas/pizzas.component';
import { CheckoutComponent } from './order/checkout/checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {AuthGuard} from './shared/classes/auth.guard'
import { OrderCardComponent } from './order/order-card/order-card.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'store', component: OrderCardComponent},
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
  { path: 'pizzas', component: PizzasComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {path: 'orders', component: OrderDashboardComponent},
  { path: 'not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
