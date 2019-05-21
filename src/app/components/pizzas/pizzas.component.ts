import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GetPizzas } from '../../store/actions/pizzas.action';
import { Store } from '@ngxs/store';
import { Select } from '@ngxs/store';
import { PizzasState } from '../../store/state/pizzas.state';

import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzasComponent implements OnInit {
  @Select(PizzasState.getPizzas) pizzas$: Observable<Pizza[]>;
  selectedId: number;

  constructor(
    private store: Store
  ) { }

  ngOnInit () {
    this.store.dispatch(new GetPizzas());
  }
}
