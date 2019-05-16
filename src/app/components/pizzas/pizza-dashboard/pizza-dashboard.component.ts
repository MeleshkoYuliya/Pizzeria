import { Component, OnInit, Input } from '@angular/core';
import { Pizza } from '../../models/pizza.model';
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
  @Input() pizza: Pizza;
  @Input() addPizzaToOrderCallback: Function;
  @Input() isPizzaAddedToOrder: boolean;


  private price: number;
  ingredients: Array<string> = [];
  selectedPizza: Pizza;

  ngOnInit () {
    this.dashboardForm = new FormGroup({
      'dough': new FormControl(null, Validators.required),
      'size': new FormControl(null, Validators.required),
      'cheese': new FormControl(null)
    });

  }

  get sizes () {
    return this.info.map(item => item.size);
  }

  get totalPrice (): number {
    this.info.map((item) => {
      if (this.dashboardForm.value['size'] === item.size) {
        this.price = item.price;
      }
      if (this.dashboardForm.value['size'] === item.size && this.dashboardForm.value['dough'] === 'thin') {
        this.price = item.price;
      }
      if (
        this.dashboardForm.value['size'] === item.size &&
        this.dashboardForm.value['dough'] === 'traditional'
      ) {
        this.price = item.price + 2;
      }
      if (this.dashboardForm.value['size'] >= 30 &&
        this.dashboardForm.value['size'] === item.size &&
        this.dashboardForm.value['cheese']) {
        this.price = +(item.price * 0.15 + this.price).toFixed(2);
      }
    });

    this.selectedPizza = {
      ...this.pizza, qualities: {
        selectedDough: this.dashboardForm.value['dough'],
        selectedSize: this.dashboardForm.value['size']
      }
      , price: this.price, amount: 1
    };

    return this.price;
  }


  addPizzaToOrder = () => {
    const orderedPizza = { ...this.selectedPizza };
    this.addPizzaToOrderCallback(orderedPizza);
    this.selectedPizza = null;
    this.dashboardForm.reset();
  }

}
