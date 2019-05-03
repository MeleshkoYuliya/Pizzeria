import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Store } from '@ngxs/store';
import { map } from "rxjs/operators";

import { Pizza } from "../pizzas/pizzas";
import { ChangeOrderedPizzaAmount } from '../pizzas/pizzas.action'

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private store: Store) { }

  increasePizzaAmount (pizza) {
    let amount = pizza.amount + 1
    const price = +((pizza.price / pizza.amount) * amount).toFixed(2)
    this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount, price }));
  }

  decreasePizzaAmount (pizza) {
    let amount = pizza.amount - 1
    const price = +((pizza.price / pizza.amount) * amount).toFixed(2)
    if (amount < 1) {
      return
    }
    this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount, price }));
  }
}
