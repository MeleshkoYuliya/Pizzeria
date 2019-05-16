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

export class ChangeOrderedPizzaAmount {
  static readonly type = '[Pizza] Change';
  constructor(public payload: { pizza; amount: number; price: number }) { }
}
