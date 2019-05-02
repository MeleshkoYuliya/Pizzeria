import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pizza } from '../pizzas';
import { AddPizzaInOrder } from '../pizzas.action'
import { Store } from '@ngxs/store';


@Component({
  selector: 'app-pizza-dashboard',
  templateUrl: './pizza-dashboard.component.html',
  styleUrls: ['./pizza-dashboard.component.scss']
})
export class PizzaDashboardComponent implements OnInit {
  @Input() name: string;
  @Input() info: Array<any>;
  @Input() priceClass;
  @Input() pizza: Pizza

  @Output() changed = new EventEmitter<number>();

  constructor(private store: Store) { }

  selectedDough: string;
  selectedSize = 0;
  price = 0;
  isAddCheese = false;
  myclass: string;

  sizes: Array<number> = [];
  ingredients: Array<string> = [];

  handleChangeDough (evt) {
    this.selectedDough = evt.value;
  }
  handleChangeSize (size) {
    this.selectedSize = size;
    this.changed.emit(size);

  }
  handleChangeCheese (isChecked) {
    if (isChecked) {
      this.isAddCheese = true;
      return;
    }
    this.isAddCheese = false;
  }
  getTotalPrice () {
    this.info.map((item) => {
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
      if (this.selectedSize >= 30 && this.selectedSize === item.size && this.isAddCheese) {
        this.price = +(item.price * 0.15 + this.price).toFixed(2);
      }
    });

    return this.price;
  }
  addPizzaToOrder (pizza) {
    this.store.dispatch(new AddPizzaInOrder(pizza));
  }

  ngOnInit () {
 
    this.info.map((item) => {
      this.sizes.push(item.size);
    });
    this.myclass = this.priceClass;
  }
}
