import { configureStore } from '@reduxjs/toolkit';

import filtrationSlice from './slices/filtrationSlice';

export default configureStore({
  reducer: {
    filtration: filtrationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
