/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  selectCategory,
  selectSort,
  selectCurrentPage,
  setTotalFiltration,
  selectSearchValue,
} from '../redux/slices/filtrationSlice'
import {
  selectPizzas,
  fetchPizzas,
  selectStatus,
} from '../redux/slices/pizzasSlice'

import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import NotFoundData from '../components/NotFoundData/index'

// type fetchPizzas = {
//   sortApi: string
//   order: string
//   categoryId: number
//   search: string
//   currentPage: number
// }

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const sort = useSelector(selectSort)
  const category = useSelector(selectCategory)
  const currentPage = useSelector(selectCurrentPage)
  const items = useSelector(selectPizzas)
  const status = useSelector(selectStatus)
  const searchValue = useSelector(selectSearchValue)

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)
  const pizzas = items.map((item: any, i: number) => (
    <PizzaBlock key={i} {...item} />
  ))

  const getPizzas = async () => {
    const sortApi = sort.sortBy.replace('-', '')
    const order = sort.sortBy.includes('-') ? 'asc' : 'desc'
    const categoryId = category > 0 ? `&category=${category}` : ``
    const search = searchValue ? `&search=${searchValue}` : ''
    // @ts-ignore
    dispatch(fetchPizzas({ sortApi, order, categoryId, search, currentPage }))
  }

  React.useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        sortBy: sort.sortBy,
        category,
        page: currentPage,
      })
      navigate(`?${queryStr}`)
    }
    isMounted.current = true
  }, [category, sort.sortBy, currentPage])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const item = list.find((item) => item.sortBy === params.sortBy)

      dispatch(setTotalFiltration({ ...params, item }))
      isSearch.current = true
    }
  }, [])

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [category, sort.sortBy, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={category} />

        <Sort sort={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <NotFoundData />
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} />
    </div>
  )
}

export default Home
