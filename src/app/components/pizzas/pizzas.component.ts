import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';

import { PizzasState } from '../../store/state/pizzas.state';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzasComponent {
  @Select(PizzasState.getPizzas) pizzas$: Observable<Pizza[]>;
}
