import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pizza } from '../pizzas';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza: any;

  selectedDough: string;
  selectedSize = 0;
  price = 0;
  isAddCheese = false;

  sizes: Array<number> = [];
  ingredients: Array<string> = [];

  constructor() { }

  handleChangeDough (evt) {
    this.selectedDough = evt.value;
  }
  handleChangeSize (size) {
    this.selectedSize = size;
  }
  handleChangeCheese (isChecked) {
    if (isChecked) {
      this.isAddCheese = true;
      return;
    }
    this.isAddCheese = false;
  }
  getTotalPrice () {
    this.pizza.info.map((item, index) => {
      if (this.selectedSize === item.size) {
        this.price = item.price;
      }
      if (this.selectedSize === item.size && this.selectedDough === 'thin') {
        this.price = item.price;
      }
      if (
        this.selectedSize === item.size &&
        this.selectedDough === 'traditional'
      ) {
        this.price = item.price + 2;
      }
      if (this.selectedSize !== 23 && this.selectedSize === item.size && this.isAddCheese) {
        this.price = +(item.price * 0.15 + this.price).toFixed(2);
      }
    });

    return this.price;
  }
  ngOnInit () {
    this.pizza.info.map((item, index) => {
      this.sizes.push(item.size);
    });
    this.pizza.ingredients.map(item => {
      this.ingredients.push(item.ingredient);
    });
  }
}
