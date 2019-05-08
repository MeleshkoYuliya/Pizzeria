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
  removedIngredients : Ingredient [] = []

  _ingredients: Ingredient[];
  constructor(private store: Store) { }

  ngOnInit () {
    this._ingredients = this.pizza.ingredients

    if (this.removedIngredients){
      const newing = this._ingredients.concat(this.removedIngredients)
      this._ingredients = newing
      this.removedIngredients = []
    }
  }

  closeModal = () => {
    this.close();
  };

  addIngredient = (ingredient) => {
    if (!ingredient){
      return
    }
    this._ingredients.push({ ingredient: ingredient})
  }

  deleteIngredient = (index) => {
    const removedIngredient= this._ingredients.find((ingredient, i)=> i===index)
    this.removedIngredients.push(removedIngredient) 
    this._ingredients.splice(index, 1)
  }

  addBackIngredient = (ingredient, index) => {
    this._ingredients.push(ingredient)
    this.removedIngredients.splice(index, 1)
  }

  addPizzaToOrder = () =>{
    const orderedPizza = { ...this.orderedPizza, removedIngredients:[...this.removedIngredients], ingredients: this._ingredients}
    this.store.dispatch(new AddPizzaInOrder(orderedPizza));
  }
}
