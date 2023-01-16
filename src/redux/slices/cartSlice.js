import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
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
    removeItem: (state, action) => {
      const removedPackOfPizzas = state.items.filter(
        (obj) => obj.id === action.payload
      )
      const totalPricePack =
        removedPackOfPizzas.price * removedPackOfPizzas.count
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      state.totalPrice = state.totalPrice - totalPricePack
    },
    minusItem(state, action) {
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

export const selectTotalPrice = (state) => state.cart.totalPrice
export const selectItems = (state) => state.cart.items
export const selectItemById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id)

export default cartSlice.reducer
