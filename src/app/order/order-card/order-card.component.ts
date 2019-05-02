import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from "rxjs";

import { Pizza } from "../../pizzas/pizzas";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit{ 
  orderedPizzas$: Observable<Pizza[]>;
  constructor(private store: Store){}
  ngOnInit(){
    return this.orderedPizzas$=this.store.select(state => state.pizzas.orderedPizzas);
  }
}
