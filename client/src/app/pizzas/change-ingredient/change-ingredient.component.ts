import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { Pizza } from '../pizza.model';
import { AddPizzaInOrder } from '../pizzas.action'
import { Store } from '@ngxs/store';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "app-change-ingredient",
  templateUrl: "./change-ingredient.component.html",
  styleUrls: ["./change-ingredient.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeIngredientComponent implements OnInit {
  addIngredientForm: FormGroup;

  @Input() pizza: Pizza;
  @Input() close: Function;
  @Input() orderedPizza: Pizza;

  removedIngredients: string[] = []
  addedIngredients: string[] = []
  _ingredients: string[];

  constructor(private store: Store) { }

  ngOnInit () {
    this._ingredients = this.pizza.ingredients

    if (this.removedIngredients) {
      const newing = this._ingredients.concat(this.removedIngredients)
      this._ingredients = newing
      this.removedIngredients = []
    }

    this.addIngredientForm = new FormGroup({
      'ingredient': new FormControl(null),
    });
  }

  closeModal = () => {
    this.close();
  };

  addIngredient = () => {
    if (!this.addIngredientForm.value['ingredient']) {
      return
    }
    this._ingredients.push( this.addIngredientForm.value['ingredient'])
    this.addedIngredients.push(this.addIngredientForm.value['ingredient'])

    this.addIngredientForm.reset()
  }

  deleteIngredient = (index) => {
    const removedIngredient = this._ingredients.find((ingredient, i) => i === index)
    this.removedIngredients.push(removedIngredient)
    this._ingredients.splice(index, 1)
  }

  addBackIngredient = (ingredient, index) => {
    this._ingredients.push(ingredient)
    this.removedIngredients.splice(index, 1)
  }

  addPizzaToOrder = () => {
    const price = this.addedIngredients.length > 0 ? (this.addedIngredients.length * 2 + this.orderedPizza.price) : this.orderedPizza.price

    const orderedPizza = {
      ...this.orderedPizza, removedIngredients: [...this.removedIngredients],
      ingredients: this._ingredients, addedIngredients: this.addedIngredients, price: price
    }

    this.store.dispatch(new AddPizzaInOrder(orderedPizza));

    this.closeModal()
  }
}
