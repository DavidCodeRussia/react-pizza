export type TCardItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

export interface ICartSlice {
  totalPrice: number
  totalPizzas: number
  items: TCardItem[]
}
