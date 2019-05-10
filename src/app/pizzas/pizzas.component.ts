import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PizzasService } from './pizzas.service';
import { Pizza } from './pizza.model';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzasComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;
  selectedId: number;
  constructor(
    private service: PizzasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    return this.pizzas$ = this.service.getPizzas();
  }
}
