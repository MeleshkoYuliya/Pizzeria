import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from "rxjs";

import { Pizza } from "../../pizzas/pizzas";
import { ChangeOrderedPizzaAmount } from '../../pizzas/pizzas.action'

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit{ 
  orderedPizzas$: Observable<Pizza[]>;
  constructor(private store: Store){}
  price: number

  ngOnInit(){
    return this.orderedPizzas$=this.store.select(state => state.pizzas.orderedPizzas);
  }

  increasePizzaAmount (pizza) {
    let amount = pizza.amount + 1
    const price = +((pizza.price / pizza.amount) * amount).toFixed(2)
    
    this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount, price }));
  }

  decreasePizzaAmount (pizza) {
    let amount = pizza.amount - 1
    const price = +((pizza.price / pizza.amount) * amount).toFixed(2)
    if(amount<1){
      return
    }
    this.store.dispatch(new ChangeOrderedPizzaAmount({ pizza, amount, price }));
  }
}
