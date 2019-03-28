import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pizza-dashboard',
  templateUrl: './pizza-dashboard.component.html',
  styleUrls: ['../pizza-item/pizza-item.component.scss']
})
export class PizzaDashboardComponent implements OnInit {
  @Input() name: string;
  @Input() info: Array<any>;
  // @Input() size: number;
  @Output() changed = new EventEmitter<number>();

  constructor() { }

  selectedDough: string;
  selectedSize = 0;
  price = 0;
  isAddCheese = false;

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
    this.info.map((item, index) => {
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
    this.info.map((item, index) => {
      this.sizes.push(item.size);
    });
  }
}
