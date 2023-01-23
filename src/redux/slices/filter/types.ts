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
