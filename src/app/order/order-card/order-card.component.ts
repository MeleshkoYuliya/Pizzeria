import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from "rxjs";
import { ClearOrderCard } from '../../pizzas/pizzas.action'

import { Pizza } from "../../pizzas/pizzas";
import { OrderService}  from '../order.service'

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit{ 
  orderedPizzas$;
  quantity: number =0
  constructor(private store: Store, private service: OrderService,){}

  ngOnInit(){
    this.store.select(state => state.pizzas.orderedPizzas).subscribe(pizzas=>{
      pizzas.reduce((previousValue, currentValue, index) => {
        return this.quantity = +(previousValue + currentValue.amount)
      }, 0)
      return this.orderedPizzas$ = pizzas
     });
  }

  increasePizzaAmount (pizza) {
    this.service.increasePizzaAmount(pizza)
  }

  decreasePizzaAmount (pizza) {
    this.service.decreasePizzaAmount(pizza)
  }

  clearOrder(){
    this.store.dispatch(new ClearOrderCard());
  }
}
