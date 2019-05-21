import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Select } from '@ngxs/store';
import { PizzasState } from '../../../store/state/pizzas.state';

import { Pizza } from '../../../models/pizza.model';
import { IncreasePizzaAmount, DecreasePizzaAmount, DeletePizzaFromOrder } from '../../../store/actions/pizzas.action';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @Select(PizzasState.getOrderedPizzas) orderedPizzas$: Observable<Pizza[]>;
  orderedPizzas: Pizza[];
  payment = ['Cash', 'Card'];
  checkoutForm: FormGroup;
  private subscription: ISubscription;

  constructor(private store: Store) { }

  ngOnInit () {
    this.subscription = this.orderedPizzas$.subscribe(pizzas => {
      this.orderedPizzas = pizzas;
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

  get totalPrice () {
    return this.orderedPizzas$.subscribe(pizzas => {
      pizzas.reduce((previousValue, currentValue, index) => {
        return +(previousValue + currentValue.price).toFixed(2);
      }, 0);
    }
    );
  }

  onSubmit () {
    const receiveEmail = this.checkoutForm.value['send-email'] ? 'yes' : 'no';
    const receiveSms = this.checkoutForm.value['send-sms'] ? 'yes' : 'no';
    const pizza = this.orderedPizzas.map(item => {
      const excludedIngredient = item.removedIngredients ? item.removedIngredients.map(ingredient => ingredient.ingredient) : '';
      const addedIngredients = item.addedIngredients ? item.addedIngredients.map(ingredient => ingredient.ingredient) : '';

      return `
      Pizza name: ${item.name},
      dough: ${item.qualities.selectedDough},
      size: ${item.qualities.selectedSize},
      amount: ${item.amount},
      excluded ingredients: ${excludedIngredient || 'none'},
      added ingredients: ${addedIngredients || 'none'}
      `;
    });
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
    this.store.dispatch(new IncreasePizzaAmount({ pizza }));
  }

  decreasePizzaAmount (pizza) {
    this.store.dispatch(new DecreasePizzaAmount({ pizza }));
  }

  deletePizzaFromOrder (pizza) {
    this.store.dispatch(new DeletePizzaFromOrder(pizza));
  }
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
