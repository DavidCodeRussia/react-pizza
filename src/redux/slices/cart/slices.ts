import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../../utils/getCartFromLS'
import { ICartSlice, TCardItem } from './types'

const { totalPrice, totalPizzas, pizzas } = getCartFromLS()

const initialState: ICartSlice = {
  totalPrice,
  totalPizzas,
  items: pizzas,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCardItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce(
        (acc, obj) => obj.price * obj.count + acc,
        0
      )
      state.totalPizzas = state.items.reduce((acc, obj) => acc + obj.count, 0)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      // const removedPackOfPizzas = state.items.filter(
      //   (obj) => obj.id === action.payload
      // )
      // const totalPricePack = removedPackOfPizzas.price * removedPackOfPizzas.count;/
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      state.totalPizzas = state.items.reduce((acc, obj) => acc + obj.count, 0)
      // state.totalPrice = state.totalPrice - totalPricePack
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
        state.totalPrice = state.totalPrice - findItem.price
      }
      state.totalPizzas = state.items.reduce((acc, obj) => acc + obj.count, 0)
    },
    clearItems: (state) => {
      state.items = []
      state.totalPrice = 0
      state.totalPizzas = 0
    },
  },
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
