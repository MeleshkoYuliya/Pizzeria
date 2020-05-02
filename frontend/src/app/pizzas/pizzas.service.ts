import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {LoadPizzas} from './pizzas.action';
import { Observable } from "rxjs";
import { Store } from '@ngxs/store';
import { map } from "rxjs/operators";

import { Pizza } from "./pizza.model";

@Injectable({
  providedIn: "root"
})
export class PizzasService {
  constructor(private store: Store, private http: HttpClient) { }

  getPizzas (): Observable<Pizza[]> {
   return this.http.get<Pizza[]>('/api/pizzas')
    .pipe(
      tap(
        (pizzas) => {
          this.store.dispatch(new LoadPizzas(pizzas));
          return this.store.select(state => state.pizzas.pizzas);
        }
      )
    );
  }

  getPizza (id: number | string) {
    return this.getPizzas().pipe(
      map((pizzas: Pizza[]) => pizzas.find(pizza => pizza.id === +id))
    );
  }
}
