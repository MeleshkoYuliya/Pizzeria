import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-change-ingredient",
  templateUrl: "./change-ingredient.component.html",
  styleUrls: ["./change-ingredient.component.scss"]
})
export class ChangeIngredientComponent implements OnInit {
  @Input() ingredients: Array<string>;
  @Input() close: Function;

  _ingredients: Array<string>;
  constructor() { }
  ngOnInit () {
    this._ingredients = this.ingredients.slice()
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
}
