import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Pizza } from './pizzas';

import {PIZZAS} from './mock-pizzas'

import { AddPizzaInOrder, AddSelectedSize} from './pizzas.action'

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
  static getUsers (state: PizzasStateModel) {
    return state.pizzas;
  }

  @Action(AddPizzaInOrder)
  add ({ getState, patchState }: StateContext<PizzasStateModel>, { payload }: AddPizzaInOrder) {
    const state = getState();
    patchState({
      orderedPizzas: [...state.orderedPizzas, payload]
    });
  }
}