import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Store } from '@ngxs/store';
import { map } from "rxjs/operators";

import { Pizza } from "./pizzas";

@Injectable({
  providedIn: "root"
})
export class PizzasService {
  constructor(private store: Store) {}

  getPizzas(): Observable<Pizza[]> {   
    return this.store.select(state => state.pizzas.pizzas);
  }

  getPizza(id: number | string) {
    return this.getPizzas().pipe(
      map((pizzas: Pizza[]) => pizzas.find(pizza => pizza.id === +id))
    );
  }
}
