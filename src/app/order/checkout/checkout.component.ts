import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  payment = ['Cash', 'Card'];
  orderData = {};
  submitted = false;
  constructor() { }

  ngOnInit () {
  }
  onSubmit () {
    this.submitted = true;
    this.orderData = { ...this.signupForm.value };
    console.log(this.orderData);

  }
}
