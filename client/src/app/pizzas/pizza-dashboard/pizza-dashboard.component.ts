import { Component, OnInit, Input } from '@angular/core';
import { Pizza } from '../pizza.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-pizza-dashboard',
  templateUrl: './pizza-dashboard.component.html',
  styleUrls: ['./pizza-dashboard.component.scss'],
})
export class PizzaDashboardComponent implements OnInit {
  dashboardForm: FormGroup;

  @Input() name: string;
  @Input() info: Array<any>;
  @Input() priceClass: string;
  @Input() pizza: Pizza
  @Input() addPizzaToOrderCallback: Function;
  @Input() isPizzaAddedToOrder: boolean

  selectedDough: string;
  selectedSize: number;
  price: number = 0;
  isAddCheese: boolean = false;
  myclass: string;
  sizes: Array<number> = [];
  ingredients: Array<string> = [];
  selectedPizza: Pizza

  ngOnInit () {
    this.dashboardForm = new FormGroup({
      'dough': new FormControl(null, Validators.required),
      'size': new FormControl(null, Validators.required),
      'cheese': new FormControl(null)
    });

    this.dashboardForm.valueChanges.subscribe((value) => {
      this.selectedDough = value['dough']
      this.isAddCheese = value['cheese']
      this.selectedSize = value['size']
    });

    this.info.map((item) => {
      this.sizes.push(item.size);
    });
    this.myclass = this.priceClass;
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

    this.selectedPizza = {
      ...this.pizza, qualities: { selectedDough: this.selectedDough, selectedSize: this.selectedSize }
      , price: this.price, amount: 1
    }

    return this.price;
  }

  addPizzaToOrder = () => {
    const orderedPizza = { ...this.selectedPizza }
    this.addPizzaToOrderCallback(orderedPizza)
    this.selectedPizza = null
    this.dashboardForm.reset()
  }

}
