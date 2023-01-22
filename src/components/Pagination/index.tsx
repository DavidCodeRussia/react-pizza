import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentPage } from '../../redux/slices/filtrationSlice'
import { selectCurrentPage } from '../../redux/slices/filtrationSlice'

import s from './Pagination.module.scss'

const Pagination = () => {
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

export default Pagination
