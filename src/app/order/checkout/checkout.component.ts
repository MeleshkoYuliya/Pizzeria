import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service'
import { Store } from '@ngxs/store';
import { DeletePizzaFromOrder } from '../../pizzas/pizzas.action'

import {  Ingredient } from "../../pizzas/pizzas";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  payment = ['Cash', 'Card'];
  checkoutForm: FormGroup;
  orderedPizzas;
  totalPrice: number=0
  excludedIngredients: Ingredient[]

  constructor(private store: Store, private service: OrderService, private router: Router) {}

  ngOnInit () {
    this.store.select(state => state.pizzas.orderedPizzas).subscribe(pizzas => {
      this.orderedPizzas=pizzas
      this.orderedPizzas.map(pizza => {
        this.excludedIngredients = pizza.removedIngredients
      })
    }
      );

    this.checkoutForm = new FormGroup({
      'name': new FormControl(null, [Validators.minLength(3), Validators.required]),
      'phone': new FormControl(null, [Validators.required, this.validatorPhones]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'payment': new FormControl('Card'),
      'address': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'flat': new FormControl(null, [Validators.required, this.validatorNumber]),
      'floor': new FormControl(null, [Validators.required, this.validatorNumber]),
      'comments': new FormControl(null),
      'send-sms': new FormControl(null),
      'send-email': new FormControl(null)
    });

    this.checkoutForm.valueChanges.subscribe((value) => {});

    this.orderedPizzas.reduce((previousValue, currentValue, index) => {
      return this.totalPrice = +(previousValue + currentValue.price).toFixed(2)},0)
  }

  onSubmit () {
   const order={...this.checkoutForm.value, ...this.orderedPizzas, totalPrice: this.totalPrice}
   console.log(order);
  }

  validatorPhones (control: FormControl): { [s: string]: boolean } {
    const pattern: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{7}$/im;
    if (!pattern.test(control.value)) {
      return { 'custom': true };
    }
    return null;
  }
  validatorNumber (control: FormControl): { [s: string]: boolean } {
    const pattern: RegExp = /^\d+$/;
    if (!pattern.test(control.value)) {
      return { 'custom': true };
    }
    return null;
  }

  increasePizzaAmount (pizza) {
    this.service.increasePizzaAmount(pizza)
  }

  decreasePizzaAmount (pizza) {
    this.service.decreasePizzaAmount(pizza)
  }

  deletePizzaFromOrder (pizza) {
    this.store.dispatch(new DeletePizzaFromOrder(pizza));
    if (this.orderedPizzas.length === 0) {
      this.totalPrice = 0
    }
  }

}
