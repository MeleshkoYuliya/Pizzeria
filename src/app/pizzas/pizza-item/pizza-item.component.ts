import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Pizza } from "../pizzas";
import { AddPizzaInOrder } from '../pizzas.action'
import { Store } from '@ngxs/store';
import { PizzaDashboardComponent} from '../pizza-dashboard/pizza-dashboard.component'


@Component({
  selector: "app-pizza-item",
  templateUrl: "./pizza-item.component.html",
  styleUrls: ["./pizza-item.component.scss"]
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza: Pizza;
  @ViewChild(PizzaDashboardComponent)
  private pizzaDashboardComponent: PizzaDashboardComponent;

  isOpen = false;
  priceClass = "price";

  selectedSize: number;
  sizes: Array<number> = [];
  ingredients: Array<string> = [];
  orderedPizza = null

  constructor(private store: Store) { }

  open = () => {
    this.isOpen = true;
    this.orderedPizza=this.pizzaDashboardComponent.selectedPizza   
  };

  close = () => {
    this.isOpen = false;
  };

  ngOnInit() { 
    this.pizza.info.map(item => {
      this.sizes.push(item.size);
    });
    this.pizza.ingredients.map(item => {
      this.ingredients.push(item.ingredient);
    });
  }

  addPizzaToOrderCallback =(orderedPizza)=>{  
    this.store.dispatch(new AddPizzaInOrder(orderedPizza));
  }
}
