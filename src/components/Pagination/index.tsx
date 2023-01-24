import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentPage } from '../../redux/slices/filter/slices'
import { selectCurrentPage } from '../../redux/slices/filter/selectors'

import s from './Pagination.module.scss'

export const Pagination = () => {
  const disptach = useDispatch()
  const currentPage = useSelector(selectCurrentPage)

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
