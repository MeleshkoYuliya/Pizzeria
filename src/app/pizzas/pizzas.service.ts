import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { Pizza } from "./pizzas";
import { PIZZAS } from "./mock-pizzas";

@Injectable({
  providedIn: "root"
})
export class PizzasService {
  constructor() {}

  getPizzas(): Observable<Pizza[]> {
    return of(PIZZAS);
  }

  getPizza(id: number | string) {
    return this.getPizzas().pipe(
      map((pizzas: Pizza[]) => pizzas.find(pizza => pizza.id === +id))
    );
  }
}
