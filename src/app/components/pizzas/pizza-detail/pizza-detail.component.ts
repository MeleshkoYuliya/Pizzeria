import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pizza } from '../../models/pizza.model';
import { Store } from '@ngxs/store';
import { AddPizzaInOrder } from '../../store/actions/pizzas.action';

// import { PizzasService } from '../pizzas.service';
import { GetPizzas } from '../../store/actions/pizzas.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaDetailComponent implements OnInit {
  pizza$: Observable<Pizza>;
  selectedSize: number;
  sizes: Array<number> = [];
  nutricion: any;
  priceClass = 'price-card';
  pizza: Pizza;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store
  ) {

  }

  ngOnInit (): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['not-found']);
      return;
    }

    this.store.dispatch(new GetPizzas());

    this.store.select(state => state.pizzas.pizzas).pipe(
      map((pizzas: Pizza[]) => pizzas.find(pizza => pizza.id === +id))
    ).subscribe(pizza => this.pizza = pizza);

    this.pizza.info.map((item, index) => {
      this.sizes.push(item.size);
    });

    this.nutricion = this.pizza.nutricion;
  }

  addPizzaToOrderCallback = (orderedPizza) => {
    this.store.dispatch(new AddPizzaInOrder(orderedPizza));
  }
}
