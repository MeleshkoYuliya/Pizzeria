import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { Pizza } from "../pizza.model";
import { AddPizzaInOrder } from '../pizzas.action'
import { Store } from '@ngxs/store';
import { PizzaDashboardComponent } from '../pizza-dashboard/pizza-dashboard.component'


@Component({
  selector: "app-pizza-item",
  templateUrl: "./pizza-item.component.html",
  styleUrls: ["./pizza-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza: Pizza;
  @ViewChild(PizzaDashboardComponent)
  private pizzaDashboardComponent: PizzaDashboardComponent;

  isOpen: boolean = false;
  priceClass: string = "price";

  selectedSize: number;
  sizes: Array<number> = [];
  ingredients: Array<string> = [];
  orderedPizza: Pizza = null

  constructor(private store: Store) { }

  open = () => {
    this.isOpen = true;
    this.orderedPizza = this.pizzaDashboardComponent.selectedPizza
  };

  close = () => {
    this.isOpen = false;
  };

  ngOnInit () {
    this.pizza.info.map(item => {
      this.sizes.push(item.size);
    });
    this.pizza.ingredients.map(item => {
      this.ingredients.push(item);
    });
  }

  addPizzaToOrderCallback = (orderedPizza) => {
    this.store.dispatch(new AddPizzaInOrder(orderedPizza));
  }
}
