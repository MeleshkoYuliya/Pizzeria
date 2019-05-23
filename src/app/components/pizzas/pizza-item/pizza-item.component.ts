import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pizza } from '../../../models/pizza.model';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaItemComponent {
  @Input() pizza: Pizza;

  isOpen = false;
  selectedSize: number;
  orderedPizza: Pizza = null;

  changeIsOpen (isopen) {
    this.isOpen = isopen;
  }

  handleMyEvent = (pizza) => {
    this.orderedPizza = pizza;
  }

  get sizes () {
    return this.pizza.info.map(item => item.size);
  }

  get ingredients () {
    return this.pizza.ingredients.map(item => item.ingredient);
  }

}
