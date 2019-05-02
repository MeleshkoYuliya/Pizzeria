import { Component, OnInit, Input } from "@angular/core";
import { Pizza } from "../pizzas";

@Component({
  selector: "app-pizza-item",
  templateUrl: "./pizza-item.component.html",
  styleUrls: ["./pizza-item.component.scss"]
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza: Pizza;

  isOpen = false;
  priceClass = "price";

  selectedSize: number;
  sizes: Array<number> = [];
  ingredients: Array<string> = [];

  constructor() {}

  changed(size: any) {
    this.selectedSize = size;
  }

  open = () => {
    this.isOpen = true;
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
}
