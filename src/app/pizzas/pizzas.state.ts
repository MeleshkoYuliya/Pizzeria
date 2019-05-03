import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Pizza } from './pizzas';
import {PIZZAS} from './mock-pizzas'

import { AddPizzaInOrder, ChangeOrderedPizzaAmount} from './pizzas.action'
import { patch, updateItem } from '@ngxs/store/operators';

export class PizzasStateModel {
  pizzas: Pizza[];
  orderedPizzas: Pizza[]
}

@State<PizzasStateModel>({
  name: 'pizzas',
  defaults: {
    pizzas: PIZZAS,
    orderedPizzas: []
  }
})
export class PizzasState {

  @Selector()
  static getPizzas (state: PizzasStateModel) {
    return state.pizzas;
  }

  @Action(AddPizzaInOrder)
  add ({ getState, patchState }: StateContext<PizzasStateModel>, { payload }: AddPizzaInOrder) {
    const state = getState();
    patchState({
      orderedPizzas: [...state.orderedPizzas, payload]
    });
  }

  @Action(ChangeOrderedPizzaAmount)
  change ({ getState, setState }: StateContext<PizzasStateModel>, { payload }: ChangeOrderedPizzaAmount) {
    const state = getState();
    setState(
      patch({
        orderedPizzas: updateItem<any>(pizza => pizza === payload.pizza, patch({ amount: payload.amount, price: payload.price}))
      })
    );
  }
}