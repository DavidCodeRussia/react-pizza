import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type TSort = {
  name: string
  sortBy: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title'
}

type TFiltationSlice = {
  category: string | number
  currentPage: number
  sort: TSort
  searchValue: string
}

const initialState: TFiltationSlice = {
  category: '',
  currentPage: 1,
  sort: {
    name: 'popularity (desc)',
    sortBy: 'rating',
  },
  searchValue: '',
}

const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction) => {
      state.category = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setTotalFiltration: (state, action) => {
      state.category = Number(action.payload.category)
      state.currentPage = Number(action.payload.page)
      state.sort = action.payload.item
    },
  },
})

export const {
  setCategory,
  setSort,
  setCurrentPage,
  setTotalFiltration,
  setSearchValue,
} = filtrationSlice.actions

export const selectCategory = (state: RootState) => state.filtration.category
export const selectSort = (state: RootState) => state.filtration.sort
export const selectCurrentPage = (state: RootState) =>
  state.filtration.currentPage
export const selectSearchValue = (state: RootState) =>
  state.filtration.searchValue

export default filtrationSlice.reducer
