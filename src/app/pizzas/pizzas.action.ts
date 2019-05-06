import { Pizza, Ingredient } from './pizzas';

export class AddPizzaInOrder {
  static readonly type = '[Pizza] Add';
  constructor(public payload: Pizza) { }
}

export class ClearOrderCard {
  static readonly type = '[OrderedPizzas] Clear';
}

export class ChangeOrderedPizzaAmount {
  static readonly type = '[Pizza] Change';
  constructor(public payload: {pizza; amount: number; price: number}) { }
}

export class ChangePizzaIngredients {
  static readonly type = '[Ingredients] Changing';
  constructor(public payload: { pizza; ingredients: Ingredient[]}) { }
}