import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ESortBy } from './filtrationSlice'
import { RootState } from '../store'

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TParamsSearchPizza = {
  sortBy: string
  order: string
  categoryId: string
  search: string
  currentPage: string
}
// Строчка ниже тоже самое, только сокращенно
// type ParamsSearchPizza = Record<string, string>

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
  status: Status.LOADING | Status.SUCCESS | Status.ERROR
}

const initialState: IPizzaSlice = {
  pizzas: [],
  status: Status.LOADING, // loading | success | error
}

export const fetchPizzas = createAsyncThunk<IPizza[], TParamsSearchPizza>(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { sortBy, order, categoryId, search, currentPage } = params
    const { data } = await axios.get<IPizza[]>(
      `https://63bbd74a32d17a509099ef50.mockapi.io/items?page=${currentPage}&limit=4${categoryId}&sortBy=${sortBy}&order=${order}${search}`
    )

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Пиццы пустые')
    }

    return thunkAPI.fulfillWithValue(data)
  }
)

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

export const selectPizzas = (state: RootState) => state.pizzas.pizzas
export const selectStatus = (state: RootState) => state.pizzas.status

export default pizzaSlice.reducer
