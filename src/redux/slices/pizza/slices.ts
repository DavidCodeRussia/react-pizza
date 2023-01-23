import { createSlice } from '@reduxjs/toolkit'

import { fetchPizzas } from './asyncActions'
import { IPizzaSlice, Status } from './types'

const initialState: IPizzaSlice = {
  pizzas: [],
  status: Status.LOADING, // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.pizzas = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.pizzas = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.pizzas = []
    })
  },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
