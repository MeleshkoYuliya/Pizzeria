import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pizza, Ingredient } from '../../../models/pizza.model';
import { AddPizzaInOrder } from '../../../store/actions/pizzas.action';
import { Store } from '@ngxs/store';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-ingredient',
  templateUrl: './change-ingredient.component.html',
  styleUrls: ['./change-ingredient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeIngredientComponent implements OnInit {
  addIngredientForm: FormGroup;

  @Input() pizza: Pizza;
  @Input() close: Function;
  @Input() orderedPizza: Pizza;

  removedIngredients: Ingredient[] = [];
  addedIngredients: Ingredient[] = [];
  ingredients: Ingredient[];

  constructor(private store: Store) { }

  ngOnInit () {
    this.ingredients = this.pizza.ingredients;

    if (this.removedIngredients) {
      const newing = this.ingredients.concat(this.removedIngredients);
      this.ingredients = newing;
      this.removedIngredients = [];
    }

    this.addIngredientForm = new FormGroup({
      'ingredient': new FormControl(null),
    });
  }

  closeModal = () => {
    this.close();
  }

  addIngredient = () => {
    if (!this.addIngredientForm.value['ingredient']) {
      return;
    }
    this.ingredients.push({ ingredient: this.addIngredientForm.value['ingredient'] });
    this.addedIngredients.push({ ingredient: this.addIngredientForm.value['ingredient'] });

    this.addIngredientForm.reset();
  }

  deleteIngredient = (index) => {
    const removedIngredient = this.ingredients.find((ingredient, i) => i === index);
    this.removedIngredients.push(removedIngredient);
    this.ingredients.splice(index, 1);
  }

  addBackIngredient = (ingredient, index) => {
    this.ingredients.push(ingredient);
    this.removedIngredients.splice(index, 1);
  }

  addPizzaToOrder = () => {
    const price = this.addedIngredients.length > 0 ? (this.addedIngredients.length * 2 + this.orderedPizza.price) : this.orderedPizza.price;

    const orderedPizza = {
      ...this.orderedPizza, removedIngredients: [...this.removedIngredients],
      ingredients: this.ingredients, addedIngredients: this.addedIngredients, price: price
    };

    this.store.dispatch(new AddPizzaInOrder(orderedPizza));

    this.closeModal();
  }
}
