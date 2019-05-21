import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { Pizza } from '../../../models/pizza.model';

import { GetPizzas } from '../../../store/actions/pizzas.action';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaDetailComponent implements OnInit {
  priceClass = 'price-card';
  pizza: Observable<Pizza>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit (): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['not-found']);
      return;
    }

    this.store.dispatch(new GetPizzas());
    this.pizza = this.store.select(state => state.pizzas.pizzas).pipe(
      map((pizzas: Pizza[]) => pizzas.find(pizza => pizza.id === +id))
    );
  }
}
