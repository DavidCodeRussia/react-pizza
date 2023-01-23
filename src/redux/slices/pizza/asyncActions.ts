import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IPizza, TParamsSearchPizza } from './types'

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
