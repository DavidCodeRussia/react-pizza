import { RootState } from '../../store'

export const selectTotalPrice = (state: RootState) => state.cart.totalPrice
export const selectTotalPizzas = (state: RootState) => state.cart.totalPizzas
export const selectItems = (state: RootState) => state.cart.items
export const selectItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id)
