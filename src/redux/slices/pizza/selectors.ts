import { RootState } from '../../store'

export const selectPizzas = (state: RootState) => state.pizzas.pizzas
export const selectStatus = (state: RootState) => state.pizzas.status
