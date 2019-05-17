import { Pizza } from '../../models/pizza.model';

export class GetPizzas {
  static readonly type = '[Pizzas] Receive';
}

export class AddPizzaInOrder {
  static readonly type = '[Pizza] Add';
  constructor(public payload: Pizza) { }
}

export class ClearOrderCard {
  static readonly type = '[OrderedPizzas] Clear';
}

export class DeletePizzaFromOrder {
  static readonly type = '[OrderedPizza] Delete';
  constructor(public payload: Pizza) { }
}

export class IncreasePizzaAmount {
  static readonly type = '[Pizza] Increase';
  constructor(public payload: { pizza: Pizza }) { }
}

export class DecreasePizzaAmount {
  static readonly type = '[Pizza] Decrease';
  constructor(public payload: { pizza: Pizza }) { }
}
