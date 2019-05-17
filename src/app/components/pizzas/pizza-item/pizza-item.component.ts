import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pizza } from '../../models/pizza.model';
import { Store } from '@ngxs/store';


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
  sizes: Array<number> = [];
  ingredients: Array<string> = [];
  orderedPizza: Pizza = null;

  constructor(private store: Store) { }

  open = () => {
    this.isOpen = true;
  }

  handleMyEvent = (pizza) => {
    this.orderedPizza = pizza;
  }
  close = () => {
    this.isOpen = false;
  }

  ngOnInit () {
    this.pizza.info.map(item => {
      this.sizes.push(item.size);
    });
    this.pizza.ingredients.map(item => {
      this.ingredients.push(item.ingredient);
    });
  }
}
