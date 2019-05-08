import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearOrderCard, DeletePizzaFromOrder } from '../../pizzas/pizzas.action'

import { OrderService}  from '../order.service'

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit{ 
  orderedPizzas$;
  quantity: number =0
  totalPrice: number=0
  constructor(private store: Store, private service: OrderService,){}

  ngOnInit(){
    this.store.select(state => state.pizzas.orderedPizzas).subscribe(pizzas=>{
      pizzas.reduce((previousValue, currentValue, index) => {
        return this.quantity = +(previousValue + currentValue.amount)
      }, 0)
      this.orderedPizzas$ = pizzas
      this.orderedPizzas$.reduce((previousValue, currentValue, index) => {
        return this.totalPrice = +(previousValue + currentValue.price).toFixed(2)
      }, 0)
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
    this.totalPrice=0
  }

  deletePizzaFromOrder (pizza) {
    this.store.dispatch(new DeletePizzaFromOrder(pizza));
    if (this.orderedPizzas$.length === 0){
      this.totalPrice=0
    }
  }
}
