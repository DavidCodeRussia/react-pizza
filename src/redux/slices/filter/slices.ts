import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ESortBy, IFiltration, TSort } from '../filter/types'

const initialState: IFiltration = {
  category: '',
  currentPage: 1,
  sort: {
    name: 'popularity (desc)',
    sortBy: ESortBy.RATING_DESC,
  },
  searchValue: '',
}

const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | number>) => {
      state.category = action.payload
    },
    setSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setTotalFiltration: (state, action: PayloadAction<IFiltration>) => {
      state.category = Number(action.payload.category)
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
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

export default filtrationSlice.reducer
