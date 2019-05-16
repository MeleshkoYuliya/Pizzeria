import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Pizza } from '../../models/pizza.model';
import { PIZZAS } from '../../pizzas/mock-pizzas';

import { AddPizzaInOrder, ChangeOrderedPizzaAmount, ClearOrderCard, DeletePizzaFromOrder, GetPizzas } from '../actions/pizzas.action';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';

export class PizzasStateModel {
  pizzas: Pizza[];
  orderedPizzas: Pizza[];
}

@State<PizzasStateModel>({
  name: 'pizzas',
  defaults: {
    pizzas: [],
    orderedPizzas: []
  }
})
export class PizzasState {

  @Selector()
  static getPizzas (state: PizzasStateModel) {
    return state.pizzas;
  }

  @Action(GetPizzas)
  receive ({ getState, setState }: StateContext<PizzasStateModel>, { }: GetPizzas) {
    const state = getState();
    setState(
      patch({
      pizzas: [...state.pizzas, ...PIZZAS]
    })
    );
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
        orderedPizzas: updateItem<any>(pizza => pizza === payload.pizza, patch({ amount: payload.amount, price: payload.price }))
      })
    );
  }

  @Action(ClearOrderCard)
  clear ({ getState, setState }: StateContext<PizzasStateModel>, { }: ClearOrderCard) {
    const state = getState();
    setState({
      ...state,
      orderedPizzas: []
    }
    );
  }

  @Action(DeletePizzaFromOrder)
  delete ({ getState, setState }: StateContext<PizzasStateModel>, { payload }: DeletePizzaFromOrder) {
    const state = getState();
    setState(
      patch({
        orderedPizzas: removeItem<any>(pizza => pizza.id === payload.id)
      })
    );
  }
}
