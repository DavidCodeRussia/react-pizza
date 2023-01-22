export const getCartFromLS = () => {
  const data = localStorage.getItem('pizzas')
  const totalPizzas = data && JSON.parse(data)

  return totalPizzas.pizzas.length >= 0 ? totalPizzas : {}
}
