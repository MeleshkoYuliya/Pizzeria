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
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path: 'admin-dashboard', component: AdminDashboardComponent,  data: { animationState: 'AdminDashboard' }},
  {path: 'login', component: LoginPageComponent, data: { animationState: 'LoginPage' }},
  {path: 'register', component: RegisterPageComponent, data: { animationState: 'RegisterPage' }},
  {path: 'store', component: OrderCardComponent, data: { animationState: 'OrderCard' }},
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
  { path: 'pizzas', component: PizzasComponent, canActivate: [AuthGuard], data: { animationState: 'Pizzas' } },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], data: { animationState: 'Checkout' } },
  {path: 'orders', component: OrderDashboardComponent, data: { animationState: 'OrderDashboard' }},
  { path: 'not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
