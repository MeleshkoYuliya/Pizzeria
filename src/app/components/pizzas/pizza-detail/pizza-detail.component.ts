import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { PizzasState } from '../../../store/state/pizzas.state';

import { Pizza } from '../../../models/pizza.model';




@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaDetailComponent implements OnInit {
  id: number;
  @Select(PizzasState.getPizza(7)) pizza: Observable<Pizza>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit (): void {

    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    if (!this.id) {
      this.router.navigate(['not-found']);
      return;
    }



    // this.pizza = this.pizzas$.pipe(
    //   map((pizzas: Pizza[]) => pizzas.find(pizza => pizza.id === +id))
    // );
  }
}
