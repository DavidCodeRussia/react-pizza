import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import filtrationSlice from './slices/filter/slices'
import cartSlice from './slices/cart/slices'
import pizzasSlice from './slices/pizza/slices'

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
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
