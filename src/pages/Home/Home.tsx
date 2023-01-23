/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'

import { Categories, Sort, Pagination } from '../../components'
import Pizzas from './Pizzas/Pizzas'

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <Pizzas />
      <Pagination />
    </div>
  )
}

export default Home
