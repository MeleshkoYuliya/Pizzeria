import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { PizzasModule } from './pizzas/pizzas.module';
import { CheckoutComponent } from './order/checkout/checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PizzasState } from './pizzas/pizzas.state';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CheckoutComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    RegisterPageComponent,
    OrderDashboardComponent,
  ],
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
  }
}
