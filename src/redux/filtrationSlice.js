import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: 0,
  category: "",
};

const filtrationSlice = createSlice({
  name: "filtration",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSortBy, setCategory } = filtrationSlice.actions;

export const selectSortBy = (state) => state.filtration.sortBy;
export const selectsetCategory = (state) => state.filtration.category;

export default filtrationSlice.reducer;
