import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetPizzas } from '../store/actions/pizzas.action';
import { Store } from '@ngxs/store';

import { PizzasService } from './pizzas.service';
import { Pizza } from '../models/pizza.model';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzasComponent implements OnInit {
  pizzas$: Observable<Pizza[]> = this.service.getPizzas();
  selectedId: number;

  constructor(
    private service: PizzasService,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit () {
    this.store.dispatch(new GetPizzas());
  }
}
