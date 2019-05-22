import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { PizzasState } from '../../../store/state/pizzas.state';

import { Pizza } from '../../../models/pizza.model';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaDetailComponent {
  id: number = +this.route.snapshot.paramMap.get('id');
  pizza: Observable<Pizza> = this.store.select(PizzasState.getPizza).pipe(map(findPizza => {
    const pizza = findPizza(this.id - 1);
    if (!pizza) {
      this.router.navigate(['not-found']);
      return;
    }
    return pizza;
  }
  ));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }
}
