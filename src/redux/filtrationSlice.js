import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPizzaBySearch: [],
};

const filtrationSlice = createSlice({
  name: "filtration",
  initialState,
  reducers: {
    setFilteredPizzaBySearch: (state, action) => {
      state.filteredPizzaBySearch = action.payload;
    },
  },
});

export const { setFilteredPizzaBySearch } = filtrationSlice.actions;

export const selectFilteredPizzaBySearch = (state) => state.filtration.category;

export default filtrationSlice.reducer;
