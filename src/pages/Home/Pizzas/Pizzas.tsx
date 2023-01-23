import React from 'react'
import qs from 'qs'
import { useSelector } from 'react-redux'

import { list } from '../../../components/Sort'
import {
  selectStatus,
  selectPizzas,
} from '../../../redux/slices/pizza/selectors'
import { fetchPizzas } from '../../../redux/slices/pizza/asyncActions'
import { TParamsSearchPizza } from '../../../redux/slices/pizza/types'
import {
  selectCategory,
  selectSort,
  selectCurrentPage,
  selectSearchValue,
} from '../../../redux/slices/filter/selectors'
import { setTotalFiltration } from '../../../redux/slices/filter/slices'
import { useAppDispatch } from '../../../redux/store'
import NotFoundData from '../../../components/NotFoundData/index'
import PizzaBlock from '../../../components/PizzaBlock'
import Skeleton from '../../../components/PizzaBlock/Skeleton'

const Pizzas = () => {
  const dispatch = useAppDispatch()
  const status = useSelector(selectStatus)
  const items = useSelector(selectPizzas)

  const sort = useSelector(selectSort)
  const category = useSelector(selectCategory)
  const searchValue = useSelector(selectSearchValue)
  const currentPage = useSelector(selectCurrentPage)

  const isSearch = React.useRef(false)

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

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [category, sort.sortBy, searchValue, currentPage])

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

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)
  const pizzas = items.map((item: any, i: number) => (
    <PizzaBlock key={i} {...item} />
  ))

  return (
    <>
      {status === 'error' ? (
        <NotFoundData />
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
    </>
  )
}

export default Pizzas
