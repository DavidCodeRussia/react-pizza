import { RootState } from '../../store'

export const selectCategory = (state: RootState) => state.filtration.category
export const selectSort = (state: RootState) => state.filtration.sort
export const selectCurrentPage = (state: RootState) =>
  state.filtration.currentPage
export const selectSearchValue = (state: RootState) =>
  state.filtration.searchValue
