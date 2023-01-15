import { configureStore } from '@reduxjs/toolkit';

import filtrationSlice from './slices/filtrationSlice';
import cartSlice from './slices/cartSlice';

export default configureStore({
  reducer: {
    filtration: filtrationSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
