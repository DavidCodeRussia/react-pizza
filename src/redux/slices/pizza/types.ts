export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TParamsSearchPizza = {
  sortBy: string
  order: string
  categoryId: string
  search: string
  currentPage: string
}
// Строчка ниже тоже самое, только сокращенно
// type ParamsSearchPizza = Record<string, string>

export interface IPizza {
  id: string
  title: string
  price: number
  sizes: number[]
  imageUrl: string
  types: number[]
}

export interface IPizzaSlice {
  pizzas: IPizza[]
  status: Status.LOADING | Status.SUCCESS | Status.ERROR
}
