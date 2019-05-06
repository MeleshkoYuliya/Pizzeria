import { Injectable } from "@angular/core";
import { Store } from '@ngxs/store';

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
