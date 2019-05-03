import { Pizza } from './pizzas';

export class AddPizzaInOrder {
  static readonly type = '[Pizza] Add';
  constructor(public payload: Pizza) { }
}

export class ChangeOrderedPizzaAmount {
  static readonly type = '[Pizza] Change';
  constructor(public payload: {pizza; amount: number; price: number}) { }
}