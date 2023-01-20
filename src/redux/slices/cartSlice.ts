import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type TCardItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

interface ICartSlice {
  totalPrice: number
  items: TCardItem[]
}

const initialState: ICartSlice = {
  totalPrice: 0,
  items: [],
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
    },
    removeItem: (state, action: PayloadAction<string>) => {
      // const removedPackOfPizzas = state.items.filter(
      //   (obj) => obj.id === action.payload
      // )
      // const totalPricePack = removedPackOfPizzas.price * removedPackOfPizzas.count;/
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      // state.totalPrice = state.totalPrice - totalPricePack
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
        state.totalPrice = state.totalPrice - findItem.price
      }
    },
    clearItems: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export const selectTotalPrice = (state: RootState) => state.cart.totalPrice
export const selectItems = (state: RootState) => state.cart.items
export const selectItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id)

export default cartSlice.reducer
