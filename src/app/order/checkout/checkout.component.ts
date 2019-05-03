import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service'
import { Store } from '@ngxs/store';
import { Observable } from "rxjs";
import { Pizza } from "../../pizzas/pizzas";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  payment = ['Cash', 'Card'];
  checkoutForm: FormGroup;
  orderedPizzas$: Observable<Pizza[]>;
  constructor(private store: Store, private service: OrderService, private router: Router) { }

  ngOnInit () {
    this.orderedPizzas$ = this.store.select(state => state.pizzas.orderedPizzas);
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
  }

  onSubmit () {
    console.log(this.checkoutForm.value);
    this.checkoutForm.reset();
    this.router.navigate(['pizzas']);
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
}
