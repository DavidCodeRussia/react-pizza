import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  currentPage: 1,
  sort: {
    name: 'popularity (desc)',
    sortBy: 'rating',
  },
};

const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalFiltration: (state, action) => {
      state.category = Number(action.payload.category);
      state.currentPage = Number(action.payload.page);
      state.sort = action.payload.item;
    },
  },
});

export const {
  setFilteredPizzaBySearch,
  setCategory,
  setSort,
  setCurrentPage,
  setTotalFiltration,
} = filtrationSlice.actions;

export const selectCategory = (state) => state.filtration.category;
export const selectSort = (state) => state.filtration.sort;
export const selectCurrentPage = (state) => state.filtration.currentPage;

export default filtrationSlice.reducer;
