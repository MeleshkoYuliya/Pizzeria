import { Component, OnInit } from '@angular/core';
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
  orderedPizzas=[];
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

    this.orderedPizzas.reduce((previousValue, currentValue, index) => {
      return this.totalPrice = +(previousValue + currentValue.price).toFixed(2)},0)
  }

  onSubmit () {
    const receiveEmail = this.checkoutForm.value['send-email'] ? 'yes' : 'no'
    const receiveSms = this.checkoutForm.value['send-sms'] ? 'yes' : 'no'

    const pizza = this.orderedPizzas.map(item=>{
      const excludedIngredient = item.removedIngredients ? item.removedIngredients.map(ingredient=> ingredient.ingredient) : ''
      const addedIngredients = item.addedIngredients.map(ingredient => ingredient.ingredient)

      return `
      Pizza name: ${item.name},
      dough: ${item.qualities.selectedDough},
      size: ${item.qualities.selectedSize},
      amount: ${item.amount},
      excluded ingredients: ${excludedIngredient || 'none'},
      added ingredients: ${addedIngredients || 'none'}
      `
    })
    console.log(`Checkout: 
    Contact information:
      Name: ${this.checkoutForm.value['name']},
      E-mail: ${this.checkoutForm.value['email']},
      Phone Number: ${this.checkoutForm.value['phone']}
    Delivery:
      Address: ${this.checkoutForm.value['address']},
      Floor: ${this.checkoutForm.value['floor']},
      Flat/office: ${this.checkoutForm.value['flat']}
    Payment: ${this.checkoutForm.value['payment']},
    Comments: ${this.checkoutForm.value['comments']},
    Agree to receive:
      Emails: ${receiveEmail},
      SMS: ${receiveSms},
  Cart: ${pizza},
    Total price: ${this.totalPrice}
    `);
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
