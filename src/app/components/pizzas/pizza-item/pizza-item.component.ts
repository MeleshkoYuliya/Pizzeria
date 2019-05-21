import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pizza } from '../../../models/pizza.model';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza: Pizza;

  isOpen = false;
  priceClass = 'price';

  selectedSize: number;
  orderedPizza: Pizza = null;

  constructor() { }

  open = () => {
    this.isOpen = true;
  }

  handleMyEvent = (pizza) => {
    this.orderedPizza = pizza;
  }
  close = () => {
    this.isOpen = false;
  }
  get sizes () {
    return this.pizza.info.map(item => item.size);
  }

  get ingredients () {
    return this.pizza.ingredients.map(item => item.ingredient);
  }

  ngOnInit () { }
}
