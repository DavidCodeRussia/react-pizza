import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'

import { setCurrentPage } from '../../redux/slices/filtrationSlice'

import s from './Pagination.module.scss'

type IPagination = {
  currentPage: number
}

const Pagination: React.FC<IPagination> = ({ currentPage }) => {
  const disptach = useDispatch()

  return (
    <ReactPaginate
      className={s.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => disptach(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  )
}

export default Pagination
