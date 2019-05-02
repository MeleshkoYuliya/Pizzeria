import { Pizza } from './pizzas';

export class AddPizzaInOrder {
  static readonly type = '[Pizza] Add';

  constructor(public payload: Pizza) { }
}