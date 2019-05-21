import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { PizzasModule } from './components/pizzas/pizzas.module';
import { CheckoutComponent } from './components/order/checkout/checkout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { PizzasState } from './store/state/pizzas.state';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CheckoutComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PizzasModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([PizzasState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
  }
}
