import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GetPizzas } from '../store/actions/pizzas.action';
import { Store } from '@ngxs/store';

import { Pizza } from '../models/pizza.model';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzasComponent implements OnInit {
  pizzas$: Observable<Pizza[]> = this.store.select(state => state.pizzas.pizzas);
  selectedId: number;

  constructor(
    private store: Store
  ) { }

  ngOnInit () {
    this.store.dispatch(new GetPizzas());
  }
}
