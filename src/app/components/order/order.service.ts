import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { ChangeOrderedPizzaAmount, DeletePizzaFromOrder } from '../store/actions/pizzas.action';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private store: Store) { }

  increasePizzaAmount (pizza) {
    const amount = pizza.amount + 1;
    const price = +((pizza.price / pizza.amount) * amount).toFixed(2);
    this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount, price }));
  }

  decreasePizzaAmount (pizza) {
    const amount = pizza.amount - 1;
    const price = +((pizza.price / pizza.amount) * amount).toFixed(2);
    if (amount < 1) {
      this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount: 1, price: pizza.price }));
      return;
    }
    this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount, price }));
  }

  deletePizzaFromOrder (pizza) {
    this.store.dispatch(new DeletePizzaFromOrder(pizza));
  }
}
