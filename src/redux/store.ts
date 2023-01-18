import { configureStore } from '@reduxjs/toolkit'

import filtrationSlice from './slices/filtrationSlice'
import cartSlice from './slices/cartSlice'
import pizzasSlice from './slices/pizzasSlice'

export const store = configureStore({
  reducer: {
    filtration: filtrationSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

type FuncType = typeof store.getState

export type RootState = ReturnType<FuncType>
