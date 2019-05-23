import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Select } from '@ngxs/store';

import { ClearOrderCard, IncreasePizzaAmount, DecreasePizzaAmount, DeletePizzaFromOrder } from '../../../store/actions/pizzas.action';
import { Pizza } from '../../../models/pizza.model';
import { PizzasState } from '../../../store/state/pizzas.state';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent {
  @Select(PizzasState.getOrderedPizzas) orderedPizzas: Observable<Pizza[]>;

  constructor(private store: Store) { }

  get totalPrice () {
    return this.orderedPizzas
      .pipe(map(pizzas => pizzas.reduce((previousValue, currentValue, index) => {
        return +(previousValue + currentValue.price).toFixed(2);
      }, 0)));
  }

  get quantity () {
    return this.orderedPizzas
      .pipe(map(pizzas => pizzas.reduce((previousValue, currentValue, index) => {
        return +(previousValue + currentValue.amount);
      }, 0)));
  }

  increasePizzaAmount (pizza) {
    this.store.dispatch(new IncreasePizzaAmount({ pizza }));
  }

  decreasePizzaAmount (pizza) {
    this.store.dispatch(new DecreasePizzaAmount({ pizza }));
  }

  clearOrder () {
    this.store.dispatch(new ClearOrderCard());
  }

  deletePizzaFromOrder (pizza) {
    this.store.dispatch(new DeletePizzaFromOrder(pizza));
  }

}
