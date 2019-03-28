import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PizzasService } from './pizzas.service';
import { Pizza } from './pizzas';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;
  selectedId: number;
  constructor(
    private service: PizzasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.pizzas$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.service.getPizzas();
      })
    );
  }
}
