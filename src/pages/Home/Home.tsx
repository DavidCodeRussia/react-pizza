/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'

import Categories from '../../components/Categories'
import Sort from '../../components/Sort'
import Pagination from '../../components/Pagination'
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
