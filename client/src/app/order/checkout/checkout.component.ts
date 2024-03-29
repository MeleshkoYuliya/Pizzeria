import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import {Subscription} from 'rxjs';
import { Store } from '@ngxs/store';
import {MaterialService} from '../../shared/classes/material.service';
import { ClearOrderCard } from '../../pizzas/pizzas.action';

import { Pizza } from "../../pizzas/pizza.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  payment = ['Cash', 'Card'];
  checkoutForm: FormGroup;
  orderedPizzas: Pizza[] = [];
  totalPrice: number = 0
  excludedIngredients: string[] = []

  aSub: Subscription

  constructor(private store: Store, private service: OrderService, private router: Router) { }

  ngOnInit () {
    this.store.select(state => state.pizzas.orderedPizzas).subscribe(pizzas => {
      this.orderedPizzas = pizzas

      this.orderedPizzas.map(pizza => {
        this.excludedIngredients = pizza.removedIngredients
      })

      pizzas.reduce((previousValue, currentValue, index) => {
        return this.totalPrice = +(previousValue + currentValue.price).toFixed(2)
      }, 0)
    }
    );

    this.checkoutForm = new FormGroup({
      'name': new FormControl(null, [Validators.minLength(3), Validators.required]),
      'phone': new FormControl(null, [Validators.required, this.validatorPhoneNumber]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'payment': new FormControl('Card'),
      'address': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'flat': new FormControl(null, [Validators.required, this.validatorIsNumber]),
      'floor': new FormControl(null, [Validators.required, this.validatorIsNumber]),
      'comments': new FormControl(null),
      'send-sms': new FormControl(null),
      'send-email': new FormControl(null)
    });
  }

  onSubmit () {
    this.checkoutForm.disable();
    const receiveEmail = this.checkoutForm.value['send-email'] ? 'yes' : 'no';
    const receiveSms = this.checkoutForm.value['send-sms'] ? 'yes' : 'no';
    const pizza = this.orderedPizzas.map(item => {
      return {
        name: item.name,
        quantity: item.amount,
        cost: item.price,
      }
    });

    const order = {
      name: this.checkoutForm.value['name'],
      phone: this.checkoutForm.value['phone'],
      email: this.checkoutForm.value['email'],
      address: this.checkoutForm.value['address'],
      flat: this.checkoutForm.value['flat'],
      floor: this.checkoutForm.value['floor'],
      payment: this.checkoutForm.value['payment'],
      sendEmail: receiveEmail,
      sendSms: receiveSms,
      pizzas: [
        ...pizza
      ],
      totalPrice: this.totalPrice,
    }
     this.aSub = this.service.saveOrder(order).subscribe(() => {
      this.clearOrder()
       this.router.navigate(['/orders']);
    },
     error => {
       MaterialService.toast(error.error.message)
       this.checkoutForm.enable();
     });
  }

  validatorPhoneNumber (control: FormControl): { [s: string]: boolean } {
    const pattern: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{7}$/im;
    if (!pattern.test(control.value)) {
      return { 'custom': true };
    }
    return null;
  }

  validatorIsNumber (control: FormControl): { [s: string]: boolean } {
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
    this.service.deletePizzaFromOrder(pizza)
    if (this.orderedPizzas.length === 0) {
      this.totalPrice = 0
    }
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
  clearOrder () {
    this.store.dispatch(new ClearOrderCard());
    this.totalPrice = 0
  }
}
