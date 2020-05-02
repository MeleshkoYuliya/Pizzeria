import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pizza } from '../pizza.model';
import { Store } from '@ngxs/store';
import { AddPizzaInOrder } from '../pizzas.action'

import { PizzasService } from '../pizzas.service';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaDetailComponent implements OnInit {
  pizza$: Observable<Pizza>;
  selectedSize: number;
  sizes: Array<number> = [];
  nutricion: any;
  priceClass: string = 'price-card';
  pizza: Pizza;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PizzasService,
    private location: Location,
    private store: Store
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['not-found']);
      return;
    }
  }

  ngOnInit (): void {
    this.getPizza();

    this.pizza.info.map((item, index) => {
      this.sizes.push(item.size);
    });

    this.nutricion = this.pizza.nutricion;
  }

  getPizza (): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getPizza(id).subscribe(pizza => (this.pizza = pizza));
  }

  addPizzaToOrderCallback = (orderedPizza) => {
    this.store.dispatch(new AddPizzaInOrder(orderedPizza));
  }
}
