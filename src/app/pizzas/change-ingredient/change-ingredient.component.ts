import { Component, OnInit, Input } from "@angular/core";
import { Pizza, Ingredient } from '../pizzas';
import { AddPizzaInOrder } from '../pizzas.action'
import { Store } from '@ngxs/store';

@Component({
  selector: "app-change-ingredient",
  templateUrl: "./change-ingredient.component.html",
  styleUrls: ["./change-ingredient.component.scss"]
})
export class ChangeIngredientComponent implements OnInit {
  @Input() pizza: Pizza;
  @Input() close: Function;
  @Input() orderedPizza

  _ingredients: Ingredient[];
  constructor(private store: Store) { }

  ngOnInit () {
    this._ingredients=this.pizza.ingredients
  }

  closeModal = () => {
    this.close();
  };

  addIngredient = (ingredient) => {
    this._ingredients.push(ingredient)
  }

  deleteIngredient = (index) => {
    this._ingredients.splice(index, 1)
  }

  addPizzaToOrder =() =>{
    this.store.dispatch(new AddPizzaInOrder(this.orderedPizza));
  }
}
