import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum ESortBy {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type TSort = {
  name: string
  sortBy: ESortBy
}

export type IFiltration = {
  category: string | number
  currentPage: number
  sort: TSort
  searchValue: string
}

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

export const selectCategory = (state: RootState) => state.filtration.category
export const selectSort = (state: RootState) => state.filtration.sort
export const selectCurrentPage = (state: RootState) =>
  state.filtration.currentPage
export const selectSearchValue = (state: RootState) =>
  state.filtration.searchValue

export default filtrationSlice.reducer
