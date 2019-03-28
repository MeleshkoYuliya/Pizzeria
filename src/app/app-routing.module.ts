import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzasComponent } from './pizzas/pizzas.component';

const routes: Routes = [
  { path: 'pizzas', component: PizzasComponent },
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
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
