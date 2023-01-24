import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectItems,
  selectTotalPrice,
  selectTotalPizzas,
} from '../../redux/slices/cart/selectors'
import PizzaLogo from '../../assets/img/pizza-logo.svg'
import { Search } from '../Search'
import TotalPizzas from './TotalPizzas/TotalPizzas'

export const Header: React.FC = () => {
  const location = useLocation()
  const itemsInBucket = useSelector(selectItems)
  const totalPrice = useSelector(selectTotalPrice)
  const totalPizzas = useSelector(selectTotalPizzas)
  const isMounted = React.useRef(false)

  React.useEffect(() => {
    if (isMounted.current) {
      const totalPizzasInfo = {
        totalPrice: totalPrice,
        totalPizzas: totalPizzas,
        pizzas: itemsInBucket,
      }
      const pizzas = JSON.stringify(totalPizzasInfo)
      localStorage.setItem('pizzas', pizzas)
    }
    isMounted.current = true
  }, [itemsInBucket, totalPrice, totalPizzas])

  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img width="38" src={PizzaLogo} alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>the most delicious pizza in the universe</p>
          </div>
        </Link>

        {location.pathname !== '/cart' && <Search />}
        <TotalPizzas />
      </div>
    </div>
  )
}
