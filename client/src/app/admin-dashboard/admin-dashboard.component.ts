import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { Store } from '@ngxs/store';
import {MaterialService} from '../shared/classes/material.service';

import { PizzasService } from '../pizzas/pizzas.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  checkoutForm: FormGroup;
  aSub: Subscription

  constructor(private store: Store, private service: PizzasService, private router: Router) { }

  ngOnInit () {
    this.checkoutForm = new FormGroup({
      'name': new FormControl(null, []),
      'imagePath': new FormControl(null, []),
      'ingredients': new FormControl(null, []),
      'sizes': new FormControl(null, []),
      'prices': new FormControl(null, []),
      'protein': new FormControl(null, []),
      'fats': new FormControl(null, []),
      'carbohydrates': new FormControl(null, []),
      'energy': new FormControl(null, []),
    });
  }

  onSubmit () {
    this.checkoutForm.disable();
    const sizes = this.checkoutForm.value['sizes'].split(',');
    const info = sizes.map(item=>{
      const array =item.split('-');
      return {
        size: +array[0],
        price: +array[1],
      }
     });

    const ingredients = this.checkoutForm.value['ingredients'].split(',') || [];
    const pizza = {
      name: this.checkoutForm.value['name'],
      imagePath: this.checkoutForm.value['imagePath'],
      ingredients,
      info,
      nutricion: {
        protein: this.checkoutForm.value['protein'],
        fats: this.checkoutForm.value['fats'],
        carbohydrates: this.checkoutForm.value['carbohydrates'],
        energy: this.checkoutForm.value['energy'],
      }
    }
     this.aSub = this.service.createPizza(pizza).subscribe(() => {
      MaterialService.toast('Pizza was successfuly added!');
      this.checkoutForm.reset();
      this.checkoutForm.enable();
    },
     error => {
       MaterialService.toast(error.error.message)
       this.checkoutForm.enable();
     });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}