import { Pizza } from './pizzas';

export class AddPizzaInOrder {
  static readonly type = '[Pizza] Add';
  constructor(public payload: Pizza) { }
}

export class AddSelectedSize {
  static readonly type = '[Size] Add';
  constructor(public payload: number) { }
}