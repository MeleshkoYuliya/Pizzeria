import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { Store } from '@ngxs/store';
import {Order} from './interfaces';
import {tap} from 'rxjs/operators';

import { ChangeOrderedPizzaAmount, DeletePizzaFromOrder } from '../pizzas/pizzas.action'

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private store: Store, private http: HttpClient) { }

  orders: Order[] = [];

  increasePizzaAmount (pizza) {
    let amount = pizza.amount + 1
    const price = +((pizza.price / pizza.amount) * amount).toFixed(2)
    this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount, price }));
  }

  decreasePizzaAmount (pizza) {
    let amount = pizza.amount - 1
    const price = +((pizza.price / pizza.amount) * amount).toFixed(2)
    if (amount < 1) {
      this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount: 1, price: pizza.price }));
      return
    }
    this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount, price }));
  }

  deletePizzaFromOrder (pizza) {
    this.store.dispatch(new DeletePizzaFromOrder(pizza));
  }

  saveOrder(order: Order): Observable<Order>{   
    return this.http.post<Order>('/api/order', order);
  }

  getOrders(): Observable<Order[]>{   
    return this.http.get<Order[]>('/api/orders')
    .pipe(
      tap(
        (orders) => {
          this.orders = orders;
        }
      )
    );
  }
}
