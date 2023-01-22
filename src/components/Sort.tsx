import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSort, ESortBy } from '../redux/slices/filtrationSlice'
import {
  selectCategory,
  selectSort,
  selectCurrentPage,
  setTotalFiltration,
  selectSearchValue,
} from '../redux/slices/filtrationSlice'

type SortItem = {
  name: string
  sortBy: ESortBy
}

type OutsideClick = MouseEvent & {
  path: Node[]
}

export const list: SortItem[] = [
  { name: 'popularity (desc)', sortBy: ESortBy.RATING_DESC },
  { name: 'popularity (asc)', sortBy: ESortBy.RATING_ASC },
  { name: 'price (desc)', sortBy: ESortBy.PRICE_DESC },
  { name: 'price (asc)', sortBy: ESortBy.PRICE_ASC },
  { name: 'alphabet (desc)', sortBy: ESortBy.TITLE_DESC },
  { name: 'alphabet (asc)', sortBy: ESortBy.TITLE_ASC },
]

const Sort = () => {
  const disptach = useDispatch()
  const sortPopup = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)
  const sort = useSelector(selectSort)

  const handleClickOutside = (e: MouseEvent) => {
    const _event = e as OutsideClick
    const path = _event.path ?? (_event.composedPath && _event.composedPath())

    if (sortPopup.current && path.includes(sortPopup.current)) {
      return
    } else {
      setOpen(false)
    }
  }

  React.useEffect(() => {
    document.body.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const onSwitchPopup = (obj: SortItem) => {
    disptach(setSort(obj))
    setOpen(false)
  }

  return (
    <div ref={sortPopup} className="sort">
      <div className="sort__label" onClick={() => setOpen(!open)}>
        <svg
          className={open ? '' : 'rotated'}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onSwitchPopup(obj)}
                className={sort.name === obj.name ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
