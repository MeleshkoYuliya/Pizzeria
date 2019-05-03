import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from "rxjs";

import { Pizza } from "../../pizzas/pizzas";
import { OrderService}  from '../order.service'

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit{ 
  orderedPizzas$: Observable<Pizza[]>;
  constructor(private store: Store, private service: OrderService,){}

  ngOnInit(){
    return this.orderedPizzas$=this.store.select(state => state.pizzas.orderedPizzas);
  }

  increasePizzaAmount (pizza) {
    this.service.increasePizzaAmount(pizza)
  }

  decreasePizzaAmount (pizza) {
    this.service.decreasePizzaAmount(pizza)
  }
}
