/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import qs from 'qs'
import { useSelector } from 'react-redux'
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
  TParamsSearchPizza,
} from '../redux/slices/pizzasSlice'
import { setCategory } from '../redux/slices/filtrationSlice'
import { useAppDispatch } from '../redux/store'

import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import NotFoundData from '../components/NotFoundData/index'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
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
    const sortBy = sort.sortBy.replace('-', '')
    const order = sort.sortBy.includes('-') ? 'asc' : 'desc'
    const categoryId = category > 0 ? `&category=${category}` : ``
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        categoryId,
        search,
        currentPage: String(currentPage),
      })
    )
  }

  const onChangeCategory = (i: number | string) => {
    if (i === 0) {
      i = ''
    }
    dispatch(setCategory(i))
  }

  React.useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        sort: sort.sortBy,
        category,
        currentPage: currentPage,
      })
      navigate(`?${queryStr}`)
    }
    isMounted.current = true
  }, [category, sort.sortBy, currentPage])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as TParamsSearchPizza

      const sort = list.find((item) => item.sortBy === params.sortBy)

      dispatch(
        setTotalFiltration({
          category: params.categoryId,
          currentPage: Number(params.currentPage),
          searchValue: params.search,
          sort: sort || list[0],
        })
      )

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
        <Categories category={category} onChangeCategory={onChangeCategory} />

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
