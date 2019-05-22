import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { PizzasState } from '../../../store/state/pizzas.state';

import { Pizza } from '../../../models/pizza.model';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaDetailComponent implements OnInit, OnDestroy {
  id: number;
  private subscription: ISubscription;
  @Select(PizzasState.getPizza) getSelectedPizza: Observable<(id: number) => Pizza>;

  get pizza () {
    return this.getSelectedPizza.pipe(map(filterFn => filterFn(this.id - 1)));
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit (): any {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'] ? +params['id'] : 0;
    });
    if (!this.pizza) {
      this.router.navigate(['/not-found']);
    }
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
