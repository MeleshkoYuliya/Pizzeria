import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearOrderCard, IncreasePizzaAmount, DecreasePizzaAmount, DeletePizzaFromOrder } from '../../../store/actions/pizzas.action';
import { Pizza } from '../../../models/pizza.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  orderedPizzas: Observable<Pizza[]> = this.store.select(state => state.pizzas.orderedPizzas);
  _quantity: Observable<number> | number;
  _totalPrice: Observable<number> | number;

  constructor(private store: Store) { }

  ngOnInit () { }

  get totalPrice () {
    return this._totalPrice = this.store.select(state => state.pizzas.orderedPizzas)
      .pipe(map(pizzas => pizzas.reduce((previousValue, currentValue, index) => {
        return +(previousValue + currentValue.price).toFixed(2);
      }, 0)));
  }

  get quantity () {
    return this._quantity = this.store.select(state => state.pizzas.orderedPizzas)
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
    this._totalPrice = 0;
    this._quantity = 0;
  }

  deletePizzaFromOrder (pizza) {
    this.store.dispatch(new DeletePizzaFromOrder(pizza));
  }

}
