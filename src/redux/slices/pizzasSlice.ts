import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

const initialState: IPizzaSlice = {
  pizzas: [],
  status: 'loading', // loading | success | error
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { sortApi, order, categoryId, search, currentPage } = params
    const { data } = await axios.get(
      `https://63bbd74a32d17a509099ef50.mockapi.io/items?page=${currentPage}&limit=4${categoryId}&sortBy=${sortApi}&order=${order}${search}`
    )

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Пиццы пустые')
    }

    return thunkAPI.fulfillWithValue(data)
  }
)

interface IPizza {
  id: string
  title: string
  price: number
  sizes: number[]
  imageUrl: string
  types: number[]
}

interface IPizzaSlice {
  pizzas: IPizza[]
  status: 'loading' | 'success' | 'error'
}

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.pizzas = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success'
      state.pizzas = action.payload
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []
    },
  },
})

export const { setItems } = pizzaSlice.actions

export const selectPizzas = (state: RootState) => state.pizzas.pizzas
export const selectStatus = (state: RootState) => state.pizzas.status

export default pizzaSlice.reducer
